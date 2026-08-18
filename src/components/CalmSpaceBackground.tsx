// Fondo "calmo" optimizado para vistas de contenido y móviles.
// Utiliza gradientes CSS animados y estrellas vectoriales SVG parpadeantes
// mediante keyframes CSS nativos acelerados por hardware. Consumo de JS/CPU: 0%.
export default function CalmSpaceBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <style>{`
        @keyframes drift {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-2%, 2%) scale(1.05); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes twinkle-slow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        @keyframes twinkle-fast {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1.0; }
        }
        .animate-drift-orange {
          animation: drift 15s ease-in-out infinite;
        }
        .animate-drift-blue {
          animation: drift 20s ease-in-out infinite alternate;
        }
        .star-slow {
          animation: twinkle-slow 4s ease-in-out infinite;
        }
        .star-fast {
          animation: twinkle-fast 2.5s ease-in-out infinite;
        }
      `}</style>
      
      {/* Base Deep Space */}
      <div className="absolute inset-0 bg-[#02040a]" />
      
      {/* Gradiente vertical sutil para profundidad */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#02040a_0%,#090d1a_45%,#02040a_100%)]" />
      
      {/* Brillo naranja de marca (deriva lentamente) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(235,63,27,0.12),transparent_60%)] animate-drift-orange" />
      
      {/* Brillo azul profundo (deriva lentamente) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(22,38,79,0.5),transparent_60%)] animate-drift-blue" />
      
      {/* Estrellas vectoriales parpadeando */}
      <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
        {/* Capa de estrellas lentas */}
        <g className="star-slow fill-white">
          <circle cx="10%" cy="15%" r="1" />
          <circle cx="30%" cy="25%" r="1.5" />
          <circle cx="75%" cy="12%" r="1" />
          <circle cx="90%" cy="35%" r="1.2" />
          <circle cx="45%" cy="55%" r="1" />
          <circle cx="20%" cy="70%" r="1.5" />
          <circle cx="60%" cy="85%" r="1" />
          <circle cx="85%" cy="80%" r="1.2" />
        </g>
        {/* Capa de estrellas rápidas */}
        <g className="star-fast fill-white">
          <circle cx="15%" cy="40%" r="1" />
          <circle cx="50%" cy="20%" r="1" />
          <circle cx="80%" cy="60%" r="1.5" />
          <circle cx="65%" cy="45%" r="1" />
          <circle cx="35%" cy="75%" r="1.2" />
          <circle cx="10%" cy="90%" r="1" />
          <circle cx="95%" cy="75%" r="1" />
          <circle cx="55%" cy="95%" r="1.5" />
        </g>
      </svg>
    </div>
  );
}
