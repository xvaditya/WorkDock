import { NAV } from "../../constants";

export function Sidebar({ active, setActive, alerts }) {
  return (
    <aside style={{
      width: 220, minHeight: "100vh", background: "rgba(10,6,25,0.95)",
      borderRight: "1px solid rgba(107,70,193,0.2)",
      backdropFilter: "blur(30px)", display: "flex", flexDirection: "column",
      position: "fixed", left: 0, top: 0, bottom: 0, zIndex: 50,
    }}>
      {/* Logo */}
      <div style={{ padding: "28px 20px 24px", borderBottom: "1px solid rgba(107,70,193,0.15)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 20px rgba(168,85,247,0.5)", fontSize: 18, fontWeight: 900
          }}>⬡</div>
          <div>
            <div style={{ fontFamily: "'Exo 2', monospace", fontWeight: 800, fontSize: 15, letterSpacing: 3, color: "#e2d9f3" }}>WORKDOCK</div>
            <div style={{ fontFamily: "monospace", fontSize: 8, letterSpacing: 2, color: "#6b21a8", marginTop: 1 }}>OPS COMMAND</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "20px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
        {NAV.map(item => (
          <button key={item.id} onClick={() => setActive(item.id)}
            style={{
              width: "100%", textAlign: "left", padding: "10px 14px",
              borderRadius: 12, border: "none", cursor: "pointer",
              fontFamily: "monospace", fontSize: 11, letterSpacing: 2,
              fontWeight: active === item.id ? 700 : 500,
              display: "flex", alignItems: "center", gap: 10,
              transition: "all 0.2s",
              background: active === item.id
                ? "linear-gradient(135deg, rgba(124,58,237,0.25), rgba(168,85,247,0.12))"
                : "transparent",
              color: active === item.id ? "#c084fc" : "#6b7280",
              borderLeft: active === item.id ? "2px solid #a855f7" : "2px solid transparent",
            }}>
            <span style={{ fontSize: 14 }}>{item.icon}</span>
            {item.label}
            {item.id === "inventory" && alerts.lowStock > 0 && (
              <span style={{ marginLeft: "auto", background: "rgba(239,68,68,0.2)", color: "#ef4444", fontSize: 9, padding: "1px 6px", borderRadius: 6, border: "1px solid rgba(239,68,68,0.3)" }}>{alerts.lowStock}</span>
            )}
            {item.id === "orders" && alerts.pendingOrders > 0 && (
              <span style={{ marginLeft: "auto", background: "rgba(245,158,11,0.2)", color: "#f59e0b", fontSize: 9, padding: "1px 6px", borderRadius: 6, border: "1px solid rgba(245,158,11,0.3)" }}>{alerts.pendingOrders}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(107,70,193,0.15)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #ec4899)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>AD</div>
          <div>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: "#d1d5db", fontWeight: 600 }}>Admin User</div>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: "#4b5563", letterSpacing: 1 }}>OPERATOR</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
