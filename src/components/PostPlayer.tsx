"use client";

import React, { useState, useEffect, useRef } from "react";

interface PostPlayerProps {
  postSlug: string;
  postTitle: string;
  postContent: string;
}

export default function PostPlayer({ postSlug, postTitle, postContent }: PostPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("SISTEMA DE AUDIO LISTO");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>("");
  const [useFallback, setUseFallback] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  // Audio HTML5 Ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // SpeechSynthesis Refs para fallback nativo
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const paragraphsRef = useRef<string[]>([]);
  const currentParagraphIndexRef = useRef(0);

  // 1. Inicializar párrafos para fallback nativo
  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;
    }

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = postContent;
    
    const tables = tempDiv.querySelectorAll("table, script, style");
    tables.forEach(el => el.remove());

    const text = tempDiv.innerText || tempDiv.textContent || "";
    const rawParagraphs = text
      .split(/\n+/)
      .map(p => p.trim())
      .filter(p => p.length > 10);

    paragraphsRef.current = [`Estás escuchando: ${postTitle}.`, ...rawParagraphs];

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [postTitle, postContent]);

  // 2. Cargar voces en español (fallback nativo)
  useEffect(() => {
    if (!synthRef.current) return;
    
    const updateVoices = () => {
      const allVoices = synthRef.current?.getVoices() || [];
      
      // Intentar obtener voces de español de EE. UU. (es-US)
      let spanish = allVoices.filter(v => {
        const lang = v.lang.toLowerCase().replace("_", "-");
        return lang === "es-us";
      });

      if (spanish.length === 0) {
        spanish = allVoices.filter(v => v.lang.toLowerCase().startsWith("es"));
      }
      
      const sortedSpanish = [...spanish].sort((a, b) => {
        const getScore = (v: SpeechSynthesisVoice) => {
          const name = v.name.toLowerCase();
          if (name.includes("siri")) return 100;
          if (name.includes("premium")) return 90;
          if (name.includes("google")) return 80;
          if (v.lang.toLowerCase() === "es-mx") return 50;
          return 10;
        };
        return getScore(b) - getScore(a);
      });

      setVoices(sortedSpanish);
      
      if (sortedSpanish.length > 0 && !selectedVoiceName) {
        setSelectedVoiceName(sortedSpanish[0].name);
      }
    };

    updateVoices();
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, [selectedVoiceName]);

  // 3. Manejar cambio de velocidad
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
    
    // Fallback nativo
    if (useFallback && isPlaying && utteranceRef.current && synthRef.current) {
      const currentIndex = currentParagraphIndexRef.current;
      synthRef.current.cancel();
      playNativeParagraph(currentIndex);
    }
  }, [speed, useFallback, isPlaying]);

  // Fallback nativo: Re-iniciar si cambia la voz seleccionada
  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextVoiceName = e.target.value;
    setSelectedVoiceName(nextVoiceName);
    
    if (useFallback && isPlaying && synthRef.current) {
      const currentIndex = currentParagraphIndexRef.current;
      synthRef.current.cancel();
      setTimeout(() => {
        playNativeParagraph(currentIndex);
      }, 50);
    }
  };

  // Fallback nativo: leer párrafo
  const playNativeParagraph = (index: number) => {
    if (!synthRef.current || index >= paragraphsRef.current.length) {
      handleStop();
      return;
    }

    currentParagraphIndexRef.current = index;
    const textToRead = paragraphsRef.current[index];

    const percent = Math.round((index / paragraphsRef.current.length) * 100);
    setProgress(percent);
    setStatusText(`NATIVO: LEYENDO SECCIÓN ${index + 1} DE ${paragraphsRef.current.length}`);

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utteranceRef.current = utterance;
    
    if (selectedVoiceName) {
      const voice = voices.find(v => v.name === selectedVoiceName);
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else {
        utterance.lang = "es-US";
      }
    } else {
      utterance.lang = "es-US";
    }
    
    utterance.rate = speed;

    utterance.onend = () => {
      playNativeParagraph(index + 1);
    };

    utterance.onerror = (e) => {
      if (e.error !== "interrupted") {
        console.error("Speech Synthesis Fallback Error:", e);
        handleStop();
      }
    };

    synthRef.current.speak(utterance);
  };

  // Reproducción principal
  const handlePlay = async () => {
    // A. Si está en pausa, reanudar
    if (isPaused) {
      if (useFallback) {
        synthRef.current?.resume();
      } else if (audioRef.current) {
        audioRef.current.play();
      }
      setIsPaused(false);
      setIsPlaying(true);
      setStatusText(useFallback ? "REANUDANDO NATIVO..." : "REPRODUCIENDO AUDIO...");
      return;
    }

    // B. Si es reproducción desde cero y ya estamos marcados con fallback
    if (useFallback) {
      synthRef.current?.cancel();
      setIsPlaying(true);
      setIsPaused(false);
      playNativeParagraph(0);
      return;
    }

    // C. Si tenemos una URL de audio de GCloud en caché en el estado
    if (audioUrl) {
      playCloudAudio(audioUrl);
      return;
    }

    // D. Solicitar audio al servidor (Google Cloud TTS / Storage)
    try {
      setStatusText("SINTETIZANDO AUDIO NATURAL...");
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: postSlug,
          title: postTitle,
          content: postContent,
        }),
      });

      if (!res.ok) {
        throw new Error("HTTP error " + res.status);
      }

      const data = await res.json();
      if (data.success && data.audioUrl) {
        setAudioUrl(data.audioUrl);
        playCloudAudio(data.audioUrl);
      } else {
        throw new Error(data.error || "No se pudo obtener el audio");
      }
    } catch (err) {
      console.warn("Fallo al obtener audio de Google Cloud, usando fallback local:", err);
      setUseFallback(true);
      setIsPlaying(true);
      setIsPaused(false);
      playNativeParagraph(0);
    }
  };

  const playCloudAudio = (url: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(url);
    audioRef.current = audio;
    audio.playbackRate = speed;

    audio.addEventListener("timeupdate", () => {
      if (audio.duration) {
        const percent = Math.round((audio.currentTime / audio.duration) * 100);
        setProgress(percent);
      }
    });

    audio.addEventListener("ended", () => {
      handleStop();
    });

    audio.addEventListener("error", (e) => {
      console.warn("Error en reproducción de GCloud, recurriendo a fallback nativo", e);
      setUseFallback(true);
      setIsPlaying(true);
      setIsPaused(false);
      playNativeParagraph(0);
    });

    setStatusText("REPRODUCIENDO AUDIO NATURAL");
    setIsPlaying(true);
    setIsPaused(false);
    audio.play().catch(err => {
      console.error("Error al iniciar play de audio:", err);
      // Fallback si el navegador bloquea autoplay
      setUseFallback(true);
      playNativeParagraph(0);
    });
  };

  const handlePause = () => {
    if (isPlaying) {
      if (useFallback) {
        synthRef.current?.pause();
      } else if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPaused(true);
      setIsPlaying(false);
      setStatusText("AUDIO EN PAUSA");
    }
  };

  const handleStop = () => {
    if (useFallback) {
      synthRef.current?.cancel();
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
    currentParagraphIndexRef.current = 0;
    setStatusText("SISTEMA DE AUDIO LISTO");
  };

  const cycleSpeed = () => {
    setSpeed(prev => {
      if (prev === 1) return 1.25;
      if (prev === 1.25) return 1.5;
      return 1;
    });
  };

  return (
    <div className="glass-liquid rounded-2xl p-5 border border-white/10 relative overflow-hidden bg-deepspace/30">
      <div className="absolute top-0 right-0 w-32 h-32 bg-orangeleader/5 blur-3xl rounded-full pointer-events-none" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Información HUD del Player */}
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-orangeleader/10 border border-orangeleader/20 text-orangeleader shrink-0">
            {isPlaying ? (
              <div className="flex items-end gap-0.5 h-4">
                <span className="w-1 bg-orangeleader animate-[pulse_0.8s_infinite_alternate]" style={{ height: "40%" }} />
                <span className="w-1 bg-orangeleader animate-[pulse_0.5s_infinite_alternate]" style={{ height: "100%" }} />
                <span className="w-1 bg-orangeleader animate-[pulse_0.7s_infinite_alternate]" style={{ height: "60%" }} />
              </div>
            ) : (
              <span className="text-[10px] font-mono">AUDIO</span>
            )}
          </div>
          <div className="space-y-1">
            <div className="font-mono text-[9px] tracking-widest text-white/40 uppercase">
              {useFallback ? "SINTETIZADOR ESTELAR (LOCAL)" : "SINTETIZADOR ESTELAR"}
            </div>
            <div className="font-mono text-[10px] text-white font-medium tracking-wide uppercase">
              {statusText}
            </div>
          </div>
        </div>

        {/* Configuración de voz y controles */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Selector de Voces (Solo si estamos usando el fallback local) */}
          {useFallback && voices.length > 1 && (
            <select
              value={selectedVoiceName}
              onChange={handleVoiceChange}
              className="bg-deepspace/60 border border-white/10 rounded-lg px-2 py-1 text-white font-sans text-[10px] outline-none max-w-[150px] focus:border-tangerine/50"
              title="Selecciona la voz para la lectura"
            >
              {voices.map(v => (
                <option key={v.name} value={v.name}>
                  {v.name.replace("Microsoft", "").replace("Google", "").trim()}
                </option>
              ))}
            </select>
          )}

          {/* Botón Play/Pause */}
          {isPlaying ? (
            <button
              onClick={handlePause}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all cursor-pointer"
              title="Pausar"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            </button>
          ) : (
            <button
              onClick={handlePlay}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-orangeleader border border-orangeleader/20 hover:bg-tangerine text-white shadow-[0_2px_8px_rgba(235,63,27,0.3)] hover:shadow-[0_2px_12px_rgba(235,63,27,0.5)] transition-all cursor-pointer active:scale-95"
              title="Reproducir nota"
            >
              <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          )}

          {/* Botón Detener */}
          {(isPlaying || isPaused || progress > 0) && (
            <button
              onClick={handleStop}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:bg-red-500/10 hover:border-red-500/20 text-white/70 hover:text-red-400 transition-all cursor-pointer"
              title="Detener"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M6 6h12v12H6z" />
              </svg>
            </button>
          )}

          {/* Controlador de velocidad */}
          <button
            onClick={cycleSpeed}
            className="px-3 h-8 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white font-mono text-[10px] tracking-wide transition-all cursor-pointer"
            title="Cambiar velocidad de lectura"
          >
            {speed}x
          </button>
        </div>
      </div>

      {/* Barra de progreso */}
      {(isPlaying || isPaused || progress > 0) && (
        <div className="mt-4 pt-3 border-t border-white/5">
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orangeleader to-tangerine transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
