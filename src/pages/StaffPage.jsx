import { useState } from "react";
import { GlassCard } from "../components/ui/GlassCard";

export function StaffPage({ staff, setStaff }) {
  const [selected, setSelected] = useState(staff[0]?.id);
  const [taskForm, setTaskForm] = useState({ title: "", due: "" });
  const member = staff.find(s => s.id === selected);

  const toggleTask = (tid) => {
    setStaff(prev => prev.map(s => s.id === selected
      ? { ...s, tasks: s.tasks.map(t => t.id === tid ? { ...t, done: !t.done } : t) }
      : s));
  };
  const addTask = () => {
    if (!taskForm.title) return;
    setStaff(prev => prev.map(s => s.id === selected
      ? { ...s, tasks: [...s.tasks, { id: Date.now(), title: taskForm.title, due: taskForm.due, done: false, overdue: false }] }
      : s));
    setTaskForm({ title: "", due: "" });
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 16 }}>
      {/* Staff list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: 3, color: "#6b7280", marginBottom: 4 }}>PERSONNEL</div>
        {staff.map(s => {
          const overdue = s.tasks.filter(t => t.overdue && !t.done).length;
          const pending = s.tasks.filter(t => !t.done).length;
          return (
            <GlassCard key={s.id} glow={selected === s.id} alert={overdue > 0}
              className="cursor-pointer" style={{ cursor: "pointer" }}
              onClick={() => setSelected(s.id)}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }} onClick={() => setSelected(s.id)}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: selected === s.id ? "linear-gradient(135deg, #7c3aed, #ec4899)" : "rgba(107,70,193,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0,
                }}>{s.avatar}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "monospace", fontSize: 12, color: "#e2d9f3", fontWeight: 600 }}>{s.name}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 9, color: "#4b5563", letterSpacing: 1 }}>{s.role}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
                  <span style={{ fontFamily: "monospace", fontSize: 10, color: "#6b7280" }}>{pending} tasks</span>
                  {overdue > 0 && <span style={{ fontSize: 9, fontFamily: "monospace", color: "#ef4444" }}>⚠ {overdue} overdue</span>}
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Task detail */}
      {member && (
        <div>
          <div style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: 3, color: "#6b7280", marginBottom: 4 }}>TASK BOARD</div>
          <div style={{ fontFamily: "'Exo 2', monospace", fontWeight: 700, fontSize: 20, color: "#e2d9f3", letterSpacing: 2, marginBottom: 16 }}>{member.name.toUpperCase()} — {member.role.toUpperCase()}</div>

          {/* Add task */}
          <GlassCard glow className="mb-4">
            <div style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: 3, color: "#6b7280", marginBottom: 12 }}>ASSIGN NEW TASK</div>
            <div style={{ display: "flex", gap: 10 }}>
              <input placeholder="Task description..." value={taskForm.title} onChange={e => setTaskForm(f => ({...f, title: e.target.value}))}
                style={{ flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(107,70,193,0.3)", borderRadius: 8, padding: "8px 12px", fontFamily: "monospace", fontSize: 12, color: "#d1d5db", outline: "none" }}/>
              <input type="date" value={taskForm.due} onChange={e => setTaskForm(f => ({...f, due: e.target.value}))}
                style={{ background: "rgba(20,10,40,0.9)", border: "1px solid rgba(107,70,193,0.3)", borderRadius: 8, padding: "8px 12px", fontFamily: "monospace", fontSize: 12, color: "#d1d5db", outline: "none" }}/>
              <button onClick={addTask} style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", borderRadius: 8, padding: "8px 16px", fontFamily: "monospace", fontSize: 10, letterSpacing: 2, color: "#fff", cursor: "pointer" }}>ASSIGN</button>
            </div>
          </GlassCard>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {member.tasks.map(task => (
              <div key={task.id} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
                borderRadius: 14, border: `1px solid ${task.overdue && !task.done ? "rgba(239,68,68,0.3)" : task.done ? "rgba(16,185,129,0.2)" : "rgba(107,70,193,0.2)"}`,
                background: task.overdue && !task.done ? "rgba(239,68,68,0.06)" : task.done ? "rgba(16,185,129,0.04)" : "rgba(20,10,40,0.4)",
                backdropFilter: "blur(10px)",
              }}>
                <button onClick={() => toggleTask(task.id)} style={{
                  width: 22, height: 22, borderRadius: "50%", flexShrink: 0, cursor: "pointer",
                  border: `2px solid ${task.done ? "#10b981" : task.overdue ? "#ef4444" : "rgba(107,70,193,0.4)"}`,
                  background: task.done ? "#10b981" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, color: "#fff",
                }}>{task.done ? "✓" : ""}</button>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: "monospace", fontSize: 12, fontWeight: 600,
                    color: task.done ? "#6b7280" : "#d1d5db",
                    textDecoration: task.done ? "line-through" : "none",
                  }}>{task.title}</div>
                  {task.due && <div style={{ fontFamily: "monospace", fontSize: 9, color: task.overdue && !task.done ? "#ef4444" : "#4b5563", marginTop: 3, letterSpacing: 1 }}>DUE: {task.due}</div>}
                </div>
                <span style={{
                  fontSize: 9, fontFamily: "monospace", letterSpacing: 1, padding: "2px 8px", borderRadius: 6,
                  color: task.done ? "#10b981" : task.overdue ? "#ef4444" : "#f59e0b",
                  background: task.done ? "rgba(16,185,129,0.1)" : task.overdue ? "rgba(239,68,68,0.1)" : "rgba(245,158,11,0.1)",
                  border: `1px solid ${task.done ? "rgba(16,185,129,0.3)" : task.overdue ? "rgba(239,68,68,0.3)" : "rgba(245,158,11,0.3)"}`,
                }}>{task.done ? "DONE" : task.overdue ? "OVERDUE" : "PENDING"}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
