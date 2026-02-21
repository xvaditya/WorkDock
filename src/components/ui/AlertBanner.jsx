export function AlertBanner({ alerts }) {
  const items = [];
  if (alerts.lowStock > 0) items.push({ type: "red", msg: `${alerts.lowStock} items below minimum stock threshold` });
  if (alerts.pendingOrders > 10) items.push({ type: "amber", msg: `${alerts.pendingOrders} orders pending — attention required` });
  if (alerts.overdueTasks > 0) items.push({ type: "red", msg: `${alerts.overdueTasks} staff tasks are overdue` });
  if (!items.length) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
      {items.map((a, i) => (
        <div key={i} style={{
          background: a.type === "red" ? "rgba(239,68,68,0.1)" : "rgba(245,158,11,0.1)",
          border: `1px solid ${a.type === "red" ? "rgba(239,68,68,0.3)" : "rgba(245,158,11,0.3)"}`,
          borderRadius: 12, padding: "10px 16px",
          display: "flex", alignItems: "center", gap: 10,
          fontFamily: "monospace", fontSize: 12,
          color: a.type === "red" ? "#fca5a5" : "#fcd34d",
          animation: "alertPulse 3s infinite",
        }}>
          <span>{a.type === "red" ? "⚠" : "⚡"}</span> {a.msg}
        </div>
      ))}
    </div>
  );
}
