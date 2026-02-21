import { useState } from "react";
import { fmtCurrency } from "../utils/helpers";
import { GlassCard } from "../components/ui/GlassCard";
import { StatusBadge } from "../components/ui/StatusBadge";

export function OrdersPage({ orders, setOrders, staff }) {
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ client: "", items: "", value: "", assignee: staff[0]?.name || "", status: "pending" });

  const filtered = filter === "all" ? orders : orders.filter(o => o.status === filter);

  const handleAdd = () => {
    if (!form.client) return;
    const today = new Date().toISOString().split("T")[0];
    setOrders(prev => [{ ...form, id: `ORD-${1099 + prev.length}`, items: +form.items, value: +form.value, date: today }, ...prev]);
    setForm({ client: "", items: "", value: "", assignee: staff[0]?.name || "", status: "pending" });
    setShowForm(false);
  };

  const cycleStatus = (id) => {
    const seq = ["pending", "in-progress", "completed"];
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: seq[(seq.indexOf(o.status) + 1) % 3] } : o));
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: 3, color: "#6b7280" }}>PIPELINE</div>
          <div style={{ fontFamily: "'Exo 2', monospace", fontWeight: 800, fontSize: 22, color: "#e2d9f3", letterSpacing: 2 }}>ORDER CONTROL</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {["all","pending","in-progress","completed"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              background: filter === f ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${filter === f ? "rgba(168,85,247,0.5)" : "rgba(107,70,193,0.2)"}`,
              borderRadius: 8, padding: "6px 12px",
              fontFamily: "monospace", fontSize: 9, letterSpacing: 1,
              color: filter === f ? "#c084fc" : "#6b7280", cursor: "pointer",
            }}>{f.toUpperCase()}</button>
          ))}
          <button onClick={() => setShowForm(!showForm)} style={{
            background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", borderRadius: 10,
            padding: "8px 16px", fontFamily: "monospace", fontSize: 10, letterSpacing: 2,
            color: "#fff", cursor: "pointer", fontWeight: 700,
          }}>+ ORDER</button>
        </div>
      </div>

      {showForm && (
        <GlassCard glow className="mb-6">
          <div style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: 3, color: "#6b7280", marginBottom: 16 }}>CREATE ORDER</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 12 }}>
            {[["client","Client Name","text"],["items","Item Count","number"],["value","Order Value","number"]].map(([k,l,t]) => (
              <div key={k}>
                <div style={{ fontFamily: "monospace", fontSize: 9, color: "#6b7280", marginBottom: 4, letterSpacing: 2 }}>{l.toUpperCase()}</div>
                <input type={t} value={form[k]} onChange={e => setForm(f => ({...f, [k]: e.target.value}))}
                  style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(107,70,193,0.3)", borderRadius: 8, padding: "8px 12px", fontFamily: "monospace", fontSize: 12, color: "#d1d5db", outline: "none", boxSizing: "border-box" }}/>
              </div>
            ))}
            <div>
              <div style={{ fontFamily: "monospace", fontSize: 9, color: "#6b7280", marginBottom: 4, letterSpacing: 2 }}>ASSIGN TO</div>
              <select value={form.assignee} onChange={e => setForm(f => ({...f, assignee: e.target.value}))}
                style={{ width: "100%", background: "rgba(20,10,40,0.9)", border: "1px solid rgba(107,70,193,0.3)", borderRadius: 8, padding: "8px 12px", fontFamily: "monospace", fontSize: 12, color: "#d1d5db", outline: "none" }}>
                {staff.map(s => <option key={s.id}>{s.name}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={handleAdd} style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", borderRadius: 8, padding: "8px 18px", fontFamily: "monospace", fontSize: 10, letterSpacing: 2, color: "#fff", cursor: "pointer" }}>CREATE</button>
            <button onClick={() => setShowForm(false)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(107,70,193,0.3)", borderRadius: 8, padding: "8px 18px", fontFamily: "monospace", fontSize: 10, letterSpacing: 2, color: "#9ca3af", cursor: "pointer" }}>CANCEL</button>
          </div>
        </GlassCard>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map(o => (
          <GlassCard key={o.id}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                <div>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: "#7c3aed", letterSpacing: 2 }}>{o.id}</div>
                  <div style={{ fontFamily: "'Exo 2', monospace", fontWeight: 700, fontSize: 15, color: "#e2d9f3", marginTop: 2 }}>{o.client}</div>
                </div>
                <div style={{ height: 32, width: 1, background: "rgba(107,70,193,0.2)" }}/>
                <div>
                  <div style={{ fontFamily: "monospace", fontSize: 9, color: "#4b5563", letterSpacing: 1 }}>ITEMS</div>
                  <div style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 700, color: "#d1d5db" }}>{o.items}</div>
                </div>
                <div>
                  <div style={{ fontFamily: "monospace", fontSize: 9, color: "#4b5563", letterSpacing: 1 }}>VALUE</div>
                  <div style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 700, color: "#a855f7" }}>{fmtCurrency(o.value)}</div>
                </div>
                <div>
                  <div style={{ fontFamily: "monospace", fontSize: 9, color: "#4b5563", letterSpacing: 1 }}>ASSIGNEE</div>
                  <div style={{ fontFamily: "monospace", fontSize: 12, color: "#d1d5db" }}>{o.assignee}</div>
                </div>
                <div>
                  <div style={{ fontFamily: "monospace", fontSize: 9, color: "#4b5563", letterSpacing: 1 }}>DATE</div>
                  <div style={{ fontFamily: "monospace", fontSize: 11, color: "#6b7280" }}>{o.date}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <StatusBadge status={o.status}/>
                {o.status !== "completed" && (
                  <button onClick={() => cycleStatus(o.id)} style={{
                    background: "rgba(124,58,237,0.15)", border: "1px solid rgba(107,70,193,0.3)",
                    borderRadius: 8, padding: "5px 10px", fontFamily: "monospace", fontSize: 9,
                    letterSpacing: 1, color: "#a855f7", cursor: "pointer",
                  }}>ADVANCE →</button>
                )}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
