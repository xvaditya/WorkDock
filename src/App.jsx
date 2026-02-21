import { useState } from "react";
import { MOCK_INVENTORY, MOCK_ORDERS, MOCK_STAFF } from "./data/mockData";
import { isLowStock } from "./utils/helpers";
import { Sidebar } from "./components/layout/Sidebar";
import { Topbar } from "./components/layout/Topbar";
import { DashboardPage } from "./pages/DashboardPage";
import { InventoryPage } from "./pages/InventoryPage";
import { OrdersPage } from "./pages/OrdersPage";
import { StaffPage } from "./pages/StaffPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { LoginPage } from "./pages/LoginPage";

export default function WorkDock() {
  const [authed, setAuthed] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [inventory, setInventory] = useState(MOCK_INVENTORY);
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [staff, setStaff] = useState(MOCK_STAFF);

  const alerts = {
    lowStock: inventory.filter(isLowStock).length,
    pendingOrders: orders.filter(o => o.status === "pending").length,
    overdueTasks: staff.flatMap(s => s.tasks).filter(t => t.overdue && !t.done).length,
  };

  if (!authed) return <LoginPage onLogin={() => setAuthed(true)}/>;

  return (
    <div style={{
      minHeight: "100vh", background: "#0a0812",
      backgroundImage: `radial-gradient(circle at 15% 40%, rgba(124,58,237,0.06) 0%, transparent 50%), radial-gradient(circle at 85% 10%, rgba(236,72,153,0.04) 0%, transparent 45%), radial-gradient(circle at 50% 90%, rgba(99,102,241,0.04) 0%, transparent 50%)`,
    }}>
      {/* Grid texture */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(rgba(107,70,193,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(107,70,193,0.03) 1px, transparent 1px)`,
        backgroundSize: "40px 40px", pointerEvents: "none",
      }}/>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;600;700;800;900&display=swap');
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes alertPulse { 0%,100%{opacity:1} 50%{opacity:0.8} }
        * { transition: none; }
        button:hover { opacity: 0.88; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: rgba(10,6,25,0.5); }
        ::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.4); border-radius: 2px; }
      `}</style>

      <Sidebar active={page} setActive={setPage} alerts={alerts}/>

      <div style={{ marginLeft: 220, position: "relative", zIndex: 1 }}>
        <Topbar page={page} alerts={alerts}/>
        <main style={{ padding: "32px" }}>
          {page === "dashboard" && <DashboardPage inventory={inventory} orders={orders} staff={staff} alerts={alerts}/>}
          {page === "inventory" && <InventoryPage inventory={inventory} setInventory={setInventory}/>}
          {page === "orders" && <OrdersPage orders={orders} setOrders={setOrders} staff={staff}/>}
          {page === "staff" && <StaffPage staff={staff} setStaff={setStaff}/>}
          {page === "analytics" && <AnalyticsPage orders={orders}/>}
        </main>
      </div>
    </div>
  );
}
