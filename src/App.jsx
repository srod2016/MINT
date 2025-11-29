import './App.css'
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";

import Layout from "./modules/Layout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budget from "./pages/Budget";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {

  return (
    <>
      
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <h1 className="text-3xl font-bold">MINT Budget Tracker</h1>
    </div>
    
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* index = default child at "/" */}
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="reports" element={<Reports />} />
          <Route path="budget" element={<Budget />} />
        </Route>
      </Routes>
    </HashRouter>

    </>
  )
}

export default App
