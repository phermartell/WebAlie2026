// Fondo "calmo" para vistas de contenido: espacio profundo estático
// (sin nebulosa WebGL animada) con brillos radiales sutiles para dar
// profundidad sin fatiga visual. Se combina con las estrellas de SpaceScene.
export default function CalmSpaceBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      {/* Base Deep Space */}
      <div className="absolute inset-0 bg-deepspace" />
      {/* Gradiente vertical sutil para profundidad */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#02040a_0%,#101b39_45%,#0a1024_100%)]" />
      {/* Brillo naranja estático (marca) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(235,63,27,0.10),transparent_55%)]" />
      {/* Brillo azul profundo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(22,38,79,0.55),transparent_60%)]" />
    </div>
  );
}
