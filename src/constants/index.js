export const NAV = [
  { id: "dashboard", label: "DASHBOARD", icon: "⬡" },
  { id: "inventory", label: "INVENTORY", icon: "◫" },
  { id: "orders", label: "ORDERS", icon: "◈" },
  { id: "staff", label: "STAFF", icon: "◎" },
  { id: "analytics", label: "ANALYTICS", icon: "◌" },
];

export const STATUS_CONFIG = {
  pending: { color: "#f59e0b", bg: "rgba(245,158,11,0.12)", label: "PENDING" },
  "in-progress": { color: "#3b82f6", bg: "rgba(59,130,246,0.12)", label: "IN PROGRESS" },
  completed: { color: "#10b981", bg: "rgba(16,185,129,0.12)", label: "COMPLETED" },
};

export const CHART_COLORS = ["#a855f7", "#ec4899", "#8b5cf6", "#6366f1", "#7c3aed"];

export const STYLES = {
  glass: {
    background: "rgba(20, 10, 40, 0.6)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
  },
};
