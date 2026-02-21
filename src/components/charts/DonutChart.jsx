import { CHART_COLORS } from "../../constants";

export function DonutChart({ data }) {
  const colors = CHART_COLORS;
  const total = data.reduce((s, d) => s + d.value, 0);
  let offset = 0;
  const r = 54, cx = 70, cy = 70, stroke = 22;
  const circ = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-6">
      <svg width="140" height="140">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1f1535" strokeWidth={stroke}/>
        {data.map((d, i) => {
          const dash = (d.value / total) * circ;
          const el = (
            <circle key={i} cx={cx} cy={cy} r={r} fill="none"
              stroke={colors[i]} strokeWidth={stroke}
              strokeDasharray={`${dash} ${circ - dash}`}
              strokeDashoffset={-offset} strokeLinecap="round"
              style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%", transition: "stroke-dasharray 0.5s" }}
            />
          );
          offset += dash;
          return el;
        })}
        <text x={cx} y={cy - 6} textAnchor="middle" fill="#e2d9f3" fontSize="18" fontWeight="700" fontFamily="monospace">100%</text>
        <text x={cx} y={cy + 12} textAnchor="middle" fill="#6b7280" fontSize="9" fontFamily="monospace">COVERAGE</text>
      </svg>
      <div className="flex flex-col gap-2">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: colors[i] }}/>
            <span style={{ fontSize: 11, color: "#9ca3af", fontFamily: "monospace" }}>{d.name}</span>
            <span style={{ fontSize: 11, color: "#d1d5db", fontFamily: "monospace", marginLeft: "auto" }}>{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
