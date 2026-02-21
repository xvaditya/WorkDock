import { useState } from "react";

export function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("admin@workdock.io");
  const [password, setPassword] = useState("••••••••");
  const [loading, setLoading] = useState(false);
  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1200);
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#0a0812", display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "monospace",
      backgroundImage: `radial-gradient(circle at 20% 50%, rgba(124,58,237,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(236,72,153,0.05) 0%, transparent 50%)`,
    }}>
      {/* Grid texture */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(rgba(107,70,193,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(107,70,193,0.04) 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        pointerEvents: "none",
      }}/>

      <div style={{ position: "relative", zIndex: 1, width: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
            boxShadow: "0 0 40px rgba(168,85,247,0.5)", fontSize: 28, fontWeight: 900
          }}>⬡</div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: 6, color: "#e2d9f3", marginBottom: 4 }}>WORKDOCK</div>
          <div style={{ fontSize: 9, letterSpacing: 4, color: "#4b5563" }}>OPERATIONAL COMMAND LAYER</div>
        </div>

        {/* Card */}
        <div style={{
          background: "rgba(20,10,40,0.8)", backdropFilter: "blur(30px)",
          border: "1px solid rgba(107,70,193,0.3)", borderRadius: 20,
          padding: 36, boxShadow: "0 0 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)"
        }}>
          <div style={{ fontSize: 9, letterSpacing: 3, color: "#6b7280", marginBottom: 24 }}>AUTHENTICATE TO ENTER</div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 9, color: "#6b7280", letterSpacing: 2, marginBottom: 6 }}>OPERATOR ID</div>
            <input value={email} onChange={e => setEmail(e.target.value)}
              style={{
                width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(107,70,193,0.3)",
                borderRadius: 10, padding: "12px 14px", fontFamily: "monospace", fontSize: 13,
                color: "#d1d5db", outline: "none", boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}/>
          </div>
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 9, color: "#6b7280", letterSpacing: 2, marginBottom: 6 }}>ACCESS KEY</div>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              style={{
                width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(107,70,193,0.3)",
                borderRadius: 10, padding: "12px 14px", fontFamily: "monospace", fontSize: 13,
                color: "#d1d5db", outline: "none", boxSizing: "border-box",
              }}/>
          </div>

          <button onClick={handleLogin} disabled={loading} style={{
            width: "100%", padding: "14px", background: loading ? "rgba(124,58,237,0.4)" : "linear-gradient(135deg, #7c3aed, #a855f7)",
            border: "none", borderRadius: 12, fontFamily: "monospace", fontSize: 11, letterSpacing: 3,
            fontWeight: 700, color: "#fff", cursor: loading ? "wait" : "pointer",
            boxShadow: "0 0 30px rgba(168,85,247,0.4)", transition: "all 0.3s",
          }}>{loading ? "AUTHENTICATING..." : "ENTER COMMAND"}</button>

          <div style={{ marginTop: 16, textAlign: "center", fontSize: 9, color: "#4b5563", letterSpacing: 2 }}>
            DEMO: admin@workdock.io / any password
          </div>
        </div>

        <div style={{ marginTop: 24, textAlign: "center", fontSize: 9, letterSpacing: 3, color: "#1f1535" }}>
          WORKDOCK v1.0 · OPERATE WITH CLARITY
        </div>
      </div>
    </div>
  );
}
