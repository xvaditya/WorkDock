import { useEffect, useState } from "react";
import { REVENUE_DATA, CATEGORY_DATA } from "../data/mockData";
import { fmtCurrency, isLowStock } from "../utils/helpers";
import { MetricCard } from "../components/ui/MetricCard";
import { GlassCard } from "../components/ui/GlassCard";
import { AlertBanner } from "../components/ui/AlertBanner";
import { StatusBadge } from "../components/ui/StatusBadge";
import { BarChart } from "../components/charts/BarChart";
import { DonutChart } from "../components/charts/DonutChart";
import { dashboardAPI, leakDetectionAPI } from "../utils/api";

export function DashboardPage({ inventory, orders, staff, alerts }) {
  const [backendData, setBackendData] = useState(null);
  const [leakSummary, setLeakSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const todayRev = REVENUE_DATA[REVENUE_DATA.length - 1].revenue;
  const monthRev = REVENUE_DATA.reduce((s, d) => s + d.revenue, 0);
  const pendingOrders = orders.filter(o => o.status === "pending").length;
  const allTasks = staff.flatMap(s => s.tasks);
  const pendingTasks = allTasks.filter(t => !t.done).length;

  useEffect(() => {
    const loadBackendData = async () => {
      try {
        const [dashRes, leaksRes] = await Promise.all([
          dashboardAPI.getSummary(),
          leakDetectionAPI.getTotalLoss(),
        ]);
        setBackendData(dashRes.data);
        setLeakSummary(leaksRes.data);
      } catch (error) {
        console.log("Backend not connected yet");
      }
      setLoading(false);
    };
    loadBackendData();
  }, []);

  return (
    <div>
      <AlertBanner alerts={alerts}/>

      {/* Backend Data Section */}
      {backendData && (
        <div style={{ marginBottom: 24, padding: 16, background: "linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(168,85,247,0.1) 100%)", borderRadius: 12, border: "1px solid rgba(99,102,241,0.2)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 style={{ fontFamily: "'Exo 2', monospace", fontWeight: 700, fontSize: 14, color: "#a78bfa", letterSpacing: 0.5 }}>
              🚀 REAL-TIME BACKEND DATA
            </h3>
            <span style={{ fontSize: 10, color: "#6b7280", fontFamily: "monospace" }}>CONNECTED ✓</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            <div style={{ padding: 12, background: "rgba(255,255,255,0.02)", borderRadius: 8, border: "1px solid rgba(107,70,193,0.15)" }}>
              <div style={{ fontSize: 10, color: "#9ca3af", fontFamily: "monospace", marginBottom: 4 }}>Total Revenue</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#86efac", fontFamily: "monospace" }}>{fmtCurrency(backendData.totalRevenue || 0)}</div>
            </div>
            <div style={{ padding: 12, background: "rgba(255,255,255,0.02)", borderRadius: 8, border: "1px solid rgba(107,70,193,0.15)" }}>
              <div style={{ fontSize: 10, color: "#9ca3af", fontFamily: "monospace", marginBottom: 4 }}>Products</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#60a5fa", fontFamily: "monospace" }}>{backendData.totalProducts || 0}</div>
            </div>
            <div style={{ padding: 12, background: "rgba(255,255,255,0.02)", borderRadius: 8, border: "1px solid rgba(107,70,193,0.15)" }}>
              <div style={{ fontSize: 10, color: "#9ca3af", fontFamily: "monospace", marginBottom: 4 }}>Low Stock</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#fca5a5", fontFamily: "monospace" }}>{backendData.lowStockCount || 0}</div>
            </div>
            <div style={{ padding: 12, background: "rgba(255,255,255,0.02)", borderRadius: 8, border: "1px solid rgba(107,70,193,0.15)" }}>
              <div style={{ fontSize: 10, color: "#9ca3af", fontFamily: "monospace", marginBottom: 4 }}>Revenue Loss</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#f87171", fontFamily: "monospace" }}>{fmtCurrency(leakSummary || 0)}</div>
            </div>
          </div>
        </div>
      )}

      {/* Hero metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <MetricCard label="TODAY'S REVENUE" value={todayRev} prefix="₹" sparkData={REVENUE_DATA.map(d => d.revenue)} delta={12.4}/>
        <MetricCard label="MONTH REVENUE" value={monthRev} prefix="₹" sparkData={REVENUE_DATA.map(d => d.revenue)} delta={8.1} color="#ec4899"/>
        <MetricCard label="PENDING ORDERS" value={pendingOrders} sparkData={REVENUE_DATA.map(d => d.orders)} delta={-5.2} color="#f59e0b"/>
        <MetricCard label="TASKS PENDING" value={pendingTasks} sparkData={[3,5,4,7,6,8,pendingTasks]} delta={2.0} color="#6366f1"/>
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 24 }}>
        <GlassCard>
          <div style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: 3, color: "#6b7280", marginBottom: 4 }}>WEEKLY REVENUE FLOW</div>
          <div style={{ fontFamily: "'Exo 2', monospace", fontWeight: 700, fontSize: 15, color: "#d8b4fe", marginBottom: 16, letterSpacing: 1 }}>ORDER VOLUME × REVENUE</div>
          <BarChart data={REVENUE_DATA}/>
        </GlassCard>
        <GlassCard>
          <div style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: 3, color: "#6b7280", marginBottom: 4 }}>CATEGORY BREAKDOWN</div>
          <div style={{ fontFamily: "'Exo 2', monospace", fontWeight: 700, fontSize: 15, color: "#d8b4fe", marginBottom: 16, letterSpacing: 1 }}>INVENTORY SPLIT</div>
          <DonutChart data={CATEGORY_DATA}/>
        </GlassCard>
      </div>

      {/* Recent Orders + Low Stock */}
      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 16 }}>
        <GlassCard>
          <div style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: 3, color: "#6b7280", marginBottom: 4 }}>LIVE FEED</div>
          <div style={{ fontFamily: "'Exo 2', monospace", fontWeight: 700, fontSize: 15, color: "#d8b4fe", marginBottom: 16, letterSpacing: 1 }}>RECENT ORDERS</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {orders.slice(0, 5).map(o => (
              <div key={o.id} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 12px", borderRadius: 10, background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(107,70,193,0.15)"
              }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontFamily: "monospace", fontSize: 10, color: "#7c3aed", letterSpacing: 1 }}>{o.id}</span>
                  <span style={{ fontFamily: "monospace", fontSize: 12, color: "#d1d5db" }}>{o.client}</span>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontFamily: "monospace", fontSize: 11, color: "#9ca3af" }}>{fmtCurrency(o.value)}</span>
                  <StatusBadge status={o.status}/>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard alert>
          <div style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: 3, color: "#ef4444", marginBottom: 4 }}>CRITICAL</div>
          <div style={{ fontFamily: "'Exo 2', monospace", fontWeight: 700, fontSize: 15, color: "#fca5a5", marginBottom: 16, letterSpacing: 1 }}>LOW STOCK ALERTS</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {inventory.filter(isLowStock).map(item => (
              <div key={item.id} style={{
                padding: "10px 12px", borderRadius: 10,
                background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
                display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <div>
                  <div style={{ fontFamily: "monospace", fontSize: 11, color: "#fca5a5", fontWeight: 600 }}>{item.name}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 9, color: "#6b7280", marginTop: 2 }}>{item.sku}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 700, color: "#ef4444" }}>{item.stock}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 9, color: "#6b7280" }}>/ {item.threshold} min</div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
