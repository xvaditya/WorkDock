import { STATUS_CONFIG } from "../../constants";

export function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || {};
  return (
    <span style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: 1, color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.color}40`, padding: "2px 8px", borderRadius: 6 }}>
      {cfg.label}
    </span>
  );
}
