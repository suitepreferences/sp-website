export default function HoneycombCluster({ className = "", style = {} }) {
  return (
    <svg viewBox="0 0 180 160" xmlns="http://www.w3.org/2000/svg" className={className} style={{ ...style }}>
      <defs>
        <path id="hex" d="M30 0 L60 17.32 L60 51.96 L30 69.28 L0 51.96 L0 17.32 Z" />

        {/* Inset shadow filter for sunken look */}
        <filter id="inset-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feOffset dx="0" dy="1" />
          <feGaussianBlur stdDeviation="2" result="offset-blur" />
          <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
          <feFlood floodColor="#FF00FF" floodOpacity="0.2" result="color" />
          <feComposite in="color" in2="inverse" operator="in" result="shadow" />
          <feComposite in="SourceGraphic" in2="shadow" operator="over" />
        </filter>

        {/* Neon purple radial gradient */}
        <radialGradient id="neon-fill" cx="50%" cy="50%" r="75%">
          <stop offset="0%" stopColor="#D100FF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1A0026" stopOpacity="0.25" />
        </radialGradient>

        <radialGradient id="hotpink-fill" cx="50%" cy="50%" r="75%">
          <stop offset="0%" stopColor="#FF00E0" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#330033" stopOpacity="0.15" />
        </radialGradient>
      </defs>

      <g>
        {/* Sunken filled hex */}
        <use href="#hex" x="0" y="69.28" fill="url(#neon-fill)" filter="url(#inset-shadow)" />

        {/* Glowing filled hexes */}
        <use href="#hex" x="30" y="17.32" fill="#FF00E0" fillOpacity="0.5" style={{ filter: "drop-shadow(0 0 6px #FF00E0)" }} />
        <use href="#hex" x="90" y="51.96" fill="#C100FF" fillOpacity="0.4" style={{ filter: "drop-shadow(0 0 8px #C100FF)" }} />

        {/* Outlined only hex */}
        <use href="#hex" x="30" y="86.6" fill="none" stroke="#C100E0" strokeWidth="1.5" opacity="0.4" />
      </g>
    </svg>
  );
}
