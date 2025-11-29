import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <Header />
      {/* Main content area where pages render */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}