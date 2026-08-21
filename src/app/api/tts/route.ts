import { NextRequest, NextResponse } from "next/server";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import { Storage } from "@google-cloud/storage";

// Inicialización diferida de los clientes de Google Cloud para evitar fallos si no se proveen variables en dev
let ttsClient: TextToSpeechClient | null = null;
let storageClient: Storage | null = null;

function getGCloudClients() {
  if (ttsClient && storageClient) {
    return { ttsClient, storageClient };
  }

  const credentialsJson = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON;
  const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;

  let credentials;
  if (credentialsJson) {
    try {
      credentials = JSON.parse(credentialsJson);
    } catch (e) {
      console.error("Error al parsear GOOGLE_APPLICATION_CREDENTIALS_JSON:", e);
    }
  }

  const config = credentials ? { credentials, projectId } : { projectId };

  // Solo inicializar si se cuenta con configuración o credenciales válidas
  if (credentials || projectId) {
    ttsClient = new TextToSpeechClient(config);
    storageClient = new Storage(config);
  }

  return { ttsClient, storageClient };
}

// Limpiar HTML
function cleanHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "")
    .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Fragmentar texto para no superar límites de la API de TTS (5000 caracteres por petición)
function chunkText(text: string, maxLength: number = 4000): string[] {
  const chunks: string[] = [];
  let currentChunk = "";

  const sentences = text.split(/([.!?]\s+)/);

  for (const part of sentences) {
    if ((currentChunk + part).length > maxLength) {
      if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
      }
      currentChunk = part;
    } else {
      currentChunk += part;
    }
  }
  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }
  return chunks;
}

export async function POST(req: NextRequest) {
  try {
    const { slug, title, content } = await req.json();

    if (!slug || !content) {
      return NextResponse.json(
        { success: false, error: "slug y content son requeridos" },
        { status: 400 }
      );
    }

    const bucketName = process.env.GCS_BUCKET_NAME;
    const { ttsClient, storageClient } = getGCloudClients();

    if (!ttsClient || !storageClient || !bucketName) {
      return NextResponse.json(
        {
          success: false,
          error: "Servicio de audio no configurado. Faltan variables de entorno de Google Cloud.",
        },
        { status: 501 }
      );
    }

    const bucket = storageClient.bucket(bucketName);
    const fileName = `audios/${slug}.mp3`;
    const file = bucket.file(fileName);

    // 1. Verificar si ya existe en Storage
    const [exists] = await file.exists();
    if (exists) {
      // Intentar obtener URL firmada de largo plazo como fallback de seguridad o usar URL pública
      let audioUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
      try {
        const [signedUrl] = await file.getSignedUrl({
          action: "read",
          expires: "03-09-2076", // Expiración a muy largo plazo
        });
        audioUrl = signedUrl;
      } catch (e) {
        console.warn("No se pudo firmar la URL, usando la URL pública estándar", e);
      }
      return NextResponse.json({ success: true, audioUrl, cached: true });
    }

    // 2. Si no existe, procedemos a generar el audio por fragmentos
    const cleanedContent = cleanHtml(content);
    const fullText = `Estás escuchando: ${title || ""}. ${cleanedContent}`;
    const textChunks = chunkText(fullText);
    const audioBuffers: Buffer[] = [];

    for (const chunk of textChunks) {
      const [response] = await ttsClient.synthesizeSpeech({
        input: { text: chunk },
        // Usar voz en español de EE. UU. (Neural2 es de las más naturales disponibles)
        voice: { languageCode: "es-US", name: "es-US-Neural2-F" },
        audioConfig: { audioEncoding: "MP3" },
      });

      if (response.audioContent) {
        audioBuffers.push(Buffer.from(response.audioContent));
      }
    }

    if (audioBuffers.length === 0) {
      return NextResponse.json(
        { success: false, error: "No se pudo generar el contenido de audio" },
        { status: 500 }
      );
    }

    // 3. Concatenar fragmentos MP3
    const combinedBuffer = Buffer.concat(audioBuffers);

    // 4. Guardar archivo en Storage
    await file.save(combinedBuffer, {
      metadata: {
        contentType: "audio/mpeg",
        cacheControl: "public, max-age=31536000",
      },
      resumable: false,
    });

    // Intentar hacer público el archivo si los permisos del bucket lo permiten
    try {
      await file.makePublic();
    } catch {
      // Si falla por políticas de acceso uniforme, no pasa nada ya que usaremos URL firmada
    }

    let audioUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
    try {
      const [signedUrl] = await file.getSignedUrl({
        action: "read",
        expires: "03-09-2076",
      });
      audioUrl = signedUrl;
    } catch (e) {
      console.warn("No se pudo firmar la URL de la subida reciente", e);
    }

    return NextResponse.json({ success: true, audioUrl, cached: false });
  } catch (error: any) {
    console.error("Error en API TTS:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Error interno del servidor" },
      { status: 500 }
    );
  }
}
