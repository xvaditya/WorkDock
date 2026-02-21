export function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.revenue));
  return (
    <div style={{ width: "100%", height: 160 }}>
      <svg width="100%" height="160" viewBox="0 0 420 160" preserveAspectRatio="none">
        <defs>
          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.4"/>
          </linearGradient>
        </defs>
        {data.map((d, i) => {
          const barH = (d.revenue / max) * 130;
          const x = i * 60 + 10;
          return (
            <g key={i}>
              <rect x={x} y={160 - barH} width={38} height={barH} rx="4" fill="url(#barGrad)" opacity="0.85"/>
              <rect x={x} y={160 - barH} width={38} height="2" rx="1" fill="#c084fc"/>
              <text x={x + 19} y="158" textAnchor="middle" fill="#6b7280" fontSize="10" fontFamily="monospace">{d.day}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
