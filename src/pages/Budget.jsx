<<<<<<< HEAD
export default function Budget() {
  return <h1 className="text-2xl font-bold">Budget</h1>;
}
=======
import React, { useState } from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

const Budget = () => {
  // state for if budget is created
  const [created, setCreated] = useState(false);
  
  // chart data
  const d = [
    { name: '1', amt: 4000 },
    { name: '2', amt: 3000 },
    { name: '3', amt: 2000 },
    { name: '4', amt: 2780 },
    { name: '5', amt: 1890 },
  ];

  const handleCreate = () => {
    // just set it to true for demo
    setCreated(true);
  }

  // View 1: Create
  if (created === false) {
    return (
      <div className="main-container" style={{ textAlign: 'center', marginTop: '50px' }}>
        <div className="card" style={{ maxWidth: '500px', margin: 'auto', padding: '50px' }}>
          <h2 style={{ color: '#555' }}>NO BUDGET DETECTED</h2>
          <p style={{ color: '#aaa', fontSize: '14px' }}>Excepteur sint occaecat</p>
          <br/>
          <input className="my-input" placeholder="Name of Budget" />
          <input className="my-input" type="number" placeholder="Limit Amount" />
          <button className="my-btn" onClick={handleCreate}>CREATE</button>
        </div>
      </div>
    );
  }

  // View 2: Dashboard
  return (
    <div className="main-container">
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h3>Total Budget Remaining</h3>
        <h1 style={{ fontSize: '40px', margin: '10px 0' }}>$ 423.00</h1>
        <button className="my-btn" style={{ width: '150px' }}>Add Expense</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Graph */}
        <div className="card">
          <div style={{ height: '200px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={d}>
                <Tooltip />
                <Area type="monotone" dataKey="amt" stroke="#2699FB" fill="#2699FB" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* List */}
        <div style={{ background: 'rgba(255,255,255,0.3)', padding: '20px', borderRadius: '10px' }}>
          <h3>Recent Purchases</h3>
          <div style={{ background: 'rgba(255,255,255,0.4)', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
            <b>$ 45.00</b><br/>
            <small>Food</small>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.4)', padding: '10px', borderRadius: '5px' }}>
            <b>$ 28.70</b><br/>
            <small>Gas</small>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Budget;
>>>>>>> main
