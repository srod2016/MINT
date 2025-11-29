// Header.jsx
import { NavLink } from "react-router-dom";

const linkBase = "px-3 py-1 rounded hover:bg-slate-800 transition-colors";
const linkActive = "bg-slate-900 font-semibold";

export default function Header() {
  return (
    <header className="header flex items-center justify-between px-6 py-3 bg-slate-950 text-slate-100 border-b border-slate-800">
      {/* Left back arrow */}
      <div style={{ fontSize: "24px" }}>←</div>

      {/* Left nav links */}
      <nav className="nav-links flex gap-4">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : ""}`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/expenses"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : ""}`
          }
        >
          Expense
        </NavLink>
      </nav>

      {/* Center title */}
      <div className="header-title text-xl font-bold tracking-wide">
        MINT
      </div>

      {/* Right nav links */}
      <nav className="nav-links flex gap-4">
        <NavLink
          to="/budget"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : ""}`
          }
        >
          Budget
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : ""}`
          }
        >
          Report
        </NavLink>
      </nav>

      {/* Right avatar circle */}
      <div
        style={{
          width: "30px",
          height: "30px",
          background: "white",
          borderRadius: "50%",
        }}
      ></div>
    </header>
  );
}
