import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  const linkBase =
    "block px-4 py-2 rounded hover:bg-slate-700 transition-colors";
  const linkActive = "bg-slate-800 font-semibold";

  return (
    <div className="min-h-screen flex bg-slate-900 text-slate-100">
      {/* Sidebar */}
      <aside className="w-60 bg-slate-950 border-r border-slate-800 p-4">
        <h1 className="text-xl font-bold mb-4">MINT</h1>

        <nav className="space-y-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : ""}`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : ""}`
            }
          >
            Transactions
          </NavLink>

          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : ""}`
            }
          >
            Reports
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : ""}`
            }
          >
            Settings
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
