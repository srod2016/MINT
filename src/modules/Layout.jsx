import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
/* Default fo the nav barrrrr*/
const linkBase = "text-white opacity-90 hover:opacity-100 hover:underline transition-all text-sm font-medium";
  const linkActive = "font-bold underline opacity-100";

return (
    // Main Container - Teal Background per Design Doc
    <div className="min-h-screen flex flex-col bg-[#76D1DF]">
      
      {/* --- TOP HEADER (Replaces Sidebar) --- */}
      <header className="h-[60px] bg-[#2699FB] flex items-center justify-between px-10 shadow-md">
        
        {/* Left: Navigation Group 1 */}
        <div className="flex gap-8">
            {/* Using /home for Dashboard as requested */}
            <NavLink to="/home" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
              Home
            </NavLink>
            <NavLink to="/expense" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
              Expense
            </NavLink>
        </div>

        {/* Center: Logo */}
        <div className="text-white text-2xl font-bold tracking-widest">
          MINT
        </div>

        {/* Right: Navigation Group 2 */}
        <div className="flex gap-8">
            <NavLink to="/budget" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
              Budget
            </NavLink>
            <NavLink to="/report" className={({ isActive }) => `${linkBase} ${isActive ? linkActive : ""}`}>
              Report
            </NavLink>
        </div>

        {/* User Icon Placeholder */}
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#2699FB] font-bold text-xs">
          U
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 relative">
        <Outlet />
      </main>
    </div>
  );
}