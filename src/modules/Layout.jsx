import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();

  // Helper for link styling
  const getLinkStyle = (path) => {
    const isActive = location.pathname === path;
    return {
      color: 'white',
      textDecoration: isActive ? 'underline' : 'none',
      fontWeight: isActive ? 'bold' : 'normal',
      opacity: isActive ? '1' : '0.8',
      cursor: 'pointer',
      fontSize: '16px',
      margin: '0 20px', // Forces space between links
      fontFamily: 'sans-serif'
    };
  };

  return (
    // Main Container - Teal Background
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#76D1DF' }}>
      
      {/* --- TOP HEADER (Hardcoded Styles) --- */}
      <header style={{
        height: '70px',
        backgroundColor: '#2699FB', /* BLUE BAR COLOR */
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        color: 'white',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        
        {/* Left: Navigation Group 1 */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: '24px', marginRight: '20px', cursor: 'pointer' }}>←</span>
            <NavLink to="/home" style={getLinkStyle('/home')}>Home</NavLink>
            <NavLink to="/expense" style={getLinkStyle('/expense')}>Expense</NavLink>
        </div>

        {/* Center: Logo */}
        <div style={{ fontSize: '28px', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase' }}>
          MINT
        </div>

        {/* Right: Navigation Group 2 */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <NavLink to="/budget" style={getLinkStyle('/budget')}>Budget</NavLink>
            <NavLink to="/report" style={getLinkStyle('/report')}>Report</NavLink>
            
            {/* User Icon */}
            <div style={{ 
              width: '40px', 
              height: '40px', 
              backgroundColor: 'white', /* White circle */
              color: '#2699FB',
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontWeight: 'bold',
              marginLeft: '20px'
            }}>
              U
            </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main style={{ flex: 1, position: 'relative' }}>
        <Outlet />
      </main>
    </div>
  );
}