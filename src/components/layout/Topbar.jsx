import { useState } from "react";

export function Topbar({ page, alerts }) {
  const [searchVal, setSearchVal] = useState("");
  const totalAlerts = alerts.lowStock + (alerts.pendingOrders > 10 ? 1 : 0) + alerts.overdueTasks;
  return (
    <div style={{
      height: 64, background: "rgba(10,6,25,0.8)", backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(107,70,193,0.15)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 32px", position: "sticky", top: 0, zIndex: 40,
    }}>
      <div>
        <div style={{ fontFamily: "monospace", fontSize: 11, color: "#4b5563", letterSpacing: 3, marginBottom: 2 }}>COMMAND LAYER</div>
        <div style={{ fontFamily: "'Exo 2', monospace", fontWeight: 800, fontSize: 18, letterSpacing: 2, color: "#e2d9f3" }}>{page.toUpperCase()}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "rgba(20,10,40,0.8)", border: "1px solid rgba(107,70,193,0.2)",
          borderRadius: 10, padding: "8px 14px", width: 220,
        }}>
          <span style={{ color: "#4b5563", fontSize: 13 }}>⌕</span>
          <input value={searchVal} onChange={e => setSearchVal(e.target.value)}
            placeholder="Search..."
            style={{ background: "none", border: "none", outline: "none", color: "#d1d5db", fontFamily: "monospace", fontSize: 12, flex: 1 }}/>
        </div>
        <div style={{ position: "relative", cursor: "pointer" }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10, background: "rgba(20,10,40,0.8)",
            border: "1px solid rgba(107,70,193,0.2)", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 16, color: "#9ca3af",
          }}>🔔</div>
          {totalAlerts > 0 && (
            <div style={{
              position: "absolute", top: -4, right: -4, width: 18, height: 18,
              background: "linear-gradient(135deg, #7c3aed, #ec4899)", borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 9, color: "#fff", fontWeight: 700, fontFamily: "monospace",
              animation: "pulse 2s infinite",
            }}>{totalAlerts}</div>
          )}
        </div>
        <div style={{
          width: 38, height: 38, borderRadius: "50%",
          background: "linear-gradient(135deg, #7c3aed, #ec4899)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer",
          boxShadow: "0 0 15px rgba(168,85,247,0.4)",
        }}>AD</div>
      </div>
    </div>
  );
}
