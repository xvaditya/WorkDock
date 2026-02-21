import { useCountUp } from "../../utils/helpers";
import { Sparkline } from "../charts/Sparkline";
import { GlassCard } from "./GlassCard";

export function MetricCard({ label, value, sub, delta, color = "#a855f7", sparkData, prefix = "", suffix = "" }) {
  const num = useCountUp(typeof value === "number" ? value : 0);
  const display = typeof value === "number" ? `${prefix}${num.toLocaleString()}${suffix}` : value;
  return (
    <GlassCard glow>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: 3, color: "#6b7280", marginBottom: 8 }}>{label}</div>
          <div style={{ fontFamily: "'Exo 2', monospace", fontWeight: 800, fontSize: 28, color: "#f3f0ff", letterSpacing: -0.5 }}>{display}</div>
          {sub && <div style={{ fontFamily: "monospace", fontSize: 10, color: "#6b7280", marginTop: 4 }}>{sub}</div>}
        </div>
        {sparkData && <Sparkline data={sparkData} color={color}/>}
      </div>
      {delta && (
        <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 10, color: delta > 0 ? "#10b981" : "#ef4444", fontFamily: "monospace" }}>
            {delta > 0 ? "▲" : "▼"} {Math.abs(delta)}%
          </span>
          <span style={{ fontSize: 10, color: "#4b5563", fontFamily: "monospace" }}>vs last week</span>
        </div>
      )}
    </GlassCard>
  );
}
