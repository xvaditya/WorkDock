import { useState } from "react";
import { fmtCurrency, isLowStock } from "../utils/helpers";
import { GlassCard } from "../components/ui/GlassCard";

export function InventoryPage({ inventory, setInventory }) {
  const [form, setForm] = useState({ name: "", sku: "", stock: "", threshold: "", price: "", category: "" });
  const [showForm, setShowForm] = useState(false);
  const handleAdd = () => {
    if (!form.name || !form.sku) return;
    setInventory(prev => [...prev, { ...form, id: Date.now(), stock: +form.stock, threshold: +form.threshold, price: +form.price }]);
    setForm({ name: "", sku: "", stock: "", threshold: "", price: "", category: "" });
    setShowForm(false);
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: 3, color: "#6b7280" }}>STOCK CONTROL</div>
          <div style={{ fontFamily: "'Exo 2', monospace", fontWeight: 800, fontSize: 22, color: "#e2d9f3", letterSpacing: 2 }}>INVENTORY MATRIX</div>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{
          background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", borderRadius: 10,
          padding: "10px 20px", fontFamily: "monospace", fontSize: 11, letterSpacing: 2,
          color: "#fff", cursor: "pointer", fontWeight: 700,
          boxShadow: "0 0 20px rgba(168,85,247,0.4)",
        }}>+ ADD PRODUCT</button>
      </div>

      {showForm && (
        <GlassCard glow className="mb-6">
          <div style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: 3, color: "#6b7280", marginBottom: 16 }}>NEW PRODUCT ENTRY</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 12 }}>
            {[["name","Product Name"],["sku","SKU"],["category","Category"],["stock","Stock Qty"],["threshold","Min Threshold"],["price","Unit Price"]].map(([k,l]) => (
              <div key={k}>
                <div style={{ fontFamily: "monospace", fontSize: 9, color: "#6b7280", marginBottom: 4, letterSpacing: 2 }}>{l.toUpperCase()}</div>
                <input value={form[k]} onChange={e => setForm(f => ({...f, [k]: e.target.value}))}
                  style={{
                    width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(107,70,193,0.3)",
                    borderRadius: 8, padding: "8px 12px", fontFamily: "monospace", fontSize: 12,
                    color: "#d1d5db", outline: "none", boxSizing: "border-box",
                  }}/>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={handleAdd} style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", border: "none", borderRadius: 8, padding: "8px 18px", fontFamily: "monospace", fontSize: 10, letterSpacing: 2, color: "#fff", cursor: "pointer" }}>CONFIRM</button>
            <button onClick={() => setShowForm(false)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(107,70,193,0.3)", borderRadius: 8, padding: "8px 18px", fontFamily: "monospace", fontSize: 10, letterSpacing: 2, color: "#9ca3af", cursor: "pointer" }}>CANCEL</button>
          </div>
        </GlassCard>
      )}

      <GlassCard>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(107,70,193,0.2)" }}>
              {["SKU","PRODUCT","CATEGORY","STOCK","THRESHOLD","PRICE","STATUS"].map(h => (
                <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontFamily: "monospace", fontSize: 9, letterSpacing: 2, color: "#4b5563", fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inventory.map(item => (
              <tr key={item.id} style={{
                borderBottom: "1px solid rgba(107,70,193,0.08)",
                background: isLowStock(item) ? "rgba(239,68,68,0.04)" : "transparent",
                transition: "background 0.2s",
              }}>
                <td style={{ padding: "12px", fontFamily: "monospace", fontSize: 10, color: "#7c3aed", letterSpacing: 1 }}>{item.sku}</td>
                <td style={{ padding: "12px", fontFamily: "monospace", fontSize: 12, color: "#d1d5db", fontWeight: 600 }}>{item.name}</td>
                <td style={{ padding: "12px", fontFamily: "monospace", fontSize: 10, color: "#6b7280" }}>{item.category}</td>
                <td style={{ padding: "12px", fontFamily: "monospace", fontSize: 14, fontWeight: 700, color: isLowStock(item) ? "#ef4444" : "#10b981" }}>{item.stock}</td>
                <td style={{ padding: "12px", fontFamily: "monospace", fontSize: 11, color: "#6b7280" }}>{item.threshold}</td>
                <td style={{ padding: "12px", fontFamily: "monospace", fontSize: 11, color: "#9ca3af" }}>{fmtCurrency(item.price)}</td>
                <td style={{ padding: "12px" }}>
                  <span style={{
                    fontSize: 9, fontFamily: "monospace", letterSpacing: 1,
                    padding: "3px 8px", borderRadius: 6,
                    color: isLowStock(item) ? "#ef4444" : "#10b981",
                    background: isLowStock(item) ? "rgba(239,68,68,0.1)" : "rgba(16,185,129,0.1)",
                    border: `1px solid ${isLowStock(item) ? "rgba(239,68,68,0.3)" : "rgba(16,185,129,0.3)"}`,
                  }}>{isLowStock(item) ? "⚠ LOW STOCK" : "✓ NOMINAL"}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
}
