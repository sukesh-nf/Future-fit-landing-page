export default function AMCTDiagram() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <svg
        viewBox="0 0 400 400"
        className="h-auto w-full"
        role="img"
        aria-label="AI-Mediated Choice Triangle: Customer, AI, and Business"
      >
        <defs>
          <linearGradient id="triGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d9488" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0f766e" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Filled triangle */}
        <polygon points="200,80 80,320 320,320" fill="url(#triGrad)" />

        {/* Triangle edges */}
        <line x1="200" y1="80" x2="80" y2="320" stroke="#0f766e" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.35" />
        <line x1="200" y1="80" x2="320" y2="320" stroke="#0f766e" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.35" />
        <line x1="80" y1="320" x2="320" y2="320" stroke="#0f766e" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.35" />

        {/* AI node (top) */}
        <circle cx="200" cy="80" r="48" fill="#0f766e" />
        <text x="200" y="76" textAnchor="middle" fill="white" fontSize="18" fontWeight="700" fontFamily="system-ui, sans-serif">AI</text>
        <text x="200" y="94" textAnchor="middle" fill="#99f6e4" fontSize="11" fontFamily="system-ui, sans-serif">Mediates context</text>
        <text x="200" y="108" textAnchor="middle" fill="#99f6e4" fontSize="11" fontFamily="system-ui, sans-serif">and choice</text>

        {/* Customer node (bottom left) */}
        <circle cx="80" cy="320" r="55" fill="white" stroke="#0f766e" strokeWidth="2" />
        <text x="80" y="314" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="600" fontFamily="system-ui, sans-serif">CUSTOMER</text>
        <text x="80" y="330" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="system-ui, sans-serif">Forms intent</text>
        <text x="80" y="344" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="system-ui, sans-serif">and chooses</text>

        {/* Business node (bottom right) */}
        <circle cx="320" cy="320" r="55" fill="white" stroke="#0f766e" strokeWidth="2" />
        <text x="320" y="314" textAnchor="middle" fill="#0f172a" fontSize="13" fontWeight="600" fontFamily="system-ui, sans-serif">BUSINESS</text>
        <text x="320" y="330" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="system-ui, sans-serif">Is understood</text>
        <text x="320" y="344" textAnchor="middle" fill="#475569" fontSize="10" fontFamily="system-ui, sans-serif">and responds</text>

        {/* Centre label */}
        <text x="200" y="222" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="700" fontFamily="system-ui, sans-serif">AI-MEDIATED</text>
        <text x="200" y="240" textAnchor="middle" fill="#0f766e" fontSize="14" fontWeight="700" fontFamily="system-ui, sans-serif">MARKETS</text>

        {/* Edge labels */}
        <text x="120" y="200" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="600" fontFamily="system-ui, sans-serif" transform="rotate(-56 120 200)">CONTEXT</text>
        <text x="280" y="200" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="600" fontFamily="system-ui, sans-serif" transform="rotate(56 280 200)">TRUST</text>
        <text x="200" y="370" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="600" fontFamily="system-ui, sans-serif">ELIGIBILITY + RESPONSE</text>
      </svg>
    </div>
  );
}
