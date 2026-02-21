export function GlassCard({ children, className = "", glow = false, alert = false }) {
  return (
    <div className={`rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5 ${className}`}
      style={{
        background: "rgba(20, 10, 40, 0.6)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderColor: alert ? "rgba(239,68,68,0.4)" : glow ? "rgba(168,85,247,0.4)" : "rgba(107,70,193,0.2)",
        boxShadow: alert ? "0 0 20px rgba(239,68,68,0.15), inset 0 1px 0 rgba(255,255,255,0.05)"
          : glow ? "0 0 30px rgba(168,85,247,0.15), inset 0 1px 0 rgba(255,255,255,0.05)"
          : "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}>
      {children}
    </div>
  );
}
