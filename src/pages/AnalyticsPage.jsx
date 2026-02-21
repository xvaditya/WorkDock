import { REVENUE_DATA, CATEGORY_DATA } from "../data/mockData";
import { fmtCurrency } from "../utils/helpers";
import { MetricCard } from "../components/ui/MetricCard";
import { GlassCard } from "../components/ui/GlassCard";
import { StatusBadge } from "../components/ui/StatusBadge";
import { BarChart } from "../components/charts/BarChart";
import { DonutChart } from "../components/charts/DonutChart";

export function AnalyticsPage({ orders }) {
  const completed = orders.filter(o => o.status === "completed");
  const totalRev = REVENUE_DATA.reduce((s, d) => s + d.revenue, 0);
  const avgOrder = totalRev / orders.length;
  return (
    <div>
      <div style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: 3, color: "#6b7280", marginBottom: 4 }}>INTELLIGENCE</div>
      <div style={{ fontFamily: "'Exo 2', monospace", fontWeight: 800, fontSize: 22, color: "#e2d9f3", letterSpacing: 2, marginBottom: 24 }}>ANALYTICS CORE</div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
        <MetricCard label="TOTAL WEEK REVENUE" value={Math.floor(totalRev)} prefix="₹" sparkData={REVENUE_DATA.map(d => d.revenue)} delta={14.2}/>
        <MetricCard label="AVG ORDER VALUE" value={Math.floor(avgOrder)} prefix="₹" sparkData={[400,600,500,800,750,900,Math.floor(avgOrder)]} delta={3.1} color="#ec4899"/>
        <MetricCard label="COMPLETION RATE" value={Math.floor((completed.length / orders.length) * 100)} suffix="%" sparkData={[70,72,68,75,74,78,Math.floor((completed.length / orders.length) * 100)]} delta={5.8} color="#10b981"/>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <GlassCard>
          <div style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: 3, color: "#6b7280", marginBottom: 4 }}>DAILY PERFORMANCE</div>
          <div style={{ fontFamily: "'Exo 2', monospace", fontWeight: 700, fontSize: 15, color: "#d8b4fe", marginBottom: 16, letterSpacing: 1 }}>REVENUE TIMELINE</div>
          <BarChart data={REVENUE_DATA}/>
        </GlassCard>
        <GlassCard>
          <div style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: 3, color: "#6b7280", marginBottom: 4 }}>PRODUCT MIX</div>
          <div style={{ fontFamily: "'Exo 2', monospace", fontWeight: 700, fontSize: 15, color: "#d8b4fe", marginBottom: 16, letterSpacing: 1 }}>CATEGORY DISTRIBUTION</div>
          <DonutChart data={CATEGORY_DATA}/>
        </GlassCard>
      </div>

      <div style={{ marginTop: 16 }}>
        <GlassCard>
          <div style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: 3, color: "#6b7280", marginBottom: 16 }}>TOP ORDERS BY VALUE</div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(107,70,193,0.2)" }}>
                {["ORDER","CLIENT","VALUE","STATUS","ASSIGNEE"].map(h => (
                  <th key={h} style={{ padding: "8px 12px", textAlign: "left", fontFamily: "monospace", fontSize: 9, letterSpacing: 2, color: "#4b5563" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...orders].sort((a,b) => b.value - a.value).slice(0, 5).map(o => (
                <tr key={o.id} style={{ borderBottom: "1px solid rgba(107,70,193,0.08)" }}>
                  <td style={{ padding: "12px", fontFamily: "monospace", fontSize: 10, color: "#7c3aed" }}>{o.id}</td>
                  <td style={{ padding: "12px", fontFamily: "monospace", fontSize: 12, color: "#d1d5db" }}>{o.client}</td>
                  <td style={{ padding: "12px", fontFamily: "monospace", fontSize: 12, color: "#a855f7", fontWeight: 700 }}>{fmtCurrency(o.value)}</td>
                  <td style={{ padding: "12px" }}><StatusBadge status={o.status}/></td>
                  <td style={{ padding: "12px", fontFamily: "monospace", fontSize: 11, color: "#6b7280" }}>{o.assignee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </div>
    </div>
  );
}
