import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Reports = () => {
  
  const data1 = [
    { n: 'M', v: 40 }, { n: 'T', v: 30 }, { n: 'W', v: 20 },
    { n: 'T', v: 27 }, { n: 'F', v: 18 }, { n: 'S', v: 23 }, { n: 'S', v: 34 },
  ];

  const data2 = [
    { name: 'A', val: 400, c: '#0088FE' },
    { name: 'B', val: 300, c: '#00C49F' },
    { name: 'C', val: 300, c: '#FFBB28' },
  ];

  return (
    <div className="main-container">
      <center>
        <h2>REPORT</h2>
        <p style={{fontSize: '12px', opacity: 0.7}}>Lorem ipsum dolor sit amet</p>
      </center>
      <br />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '20px', borderRadius: '10px' }}>
          <h4>Activity</h4>
          <div style={{ height: '200px' }}>
            <ResponsiveContainer>
              <BarChart data={data1}>
                <XAxis dataKey="n" stroke="#fff" />
                <Tooltip />
                <Bar dataKey="v" fill="#fff" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h4>Categories</h4>
          <div style={{ height: '200px' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={data2} innerRadius={50} outerRadius={70} dataKey="val">
                  {data2.map((x, i) => (
                    <Cell key={i} fill={x.c} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
      
      <br/>
      <button className="my-btn" style={{ background: '#2699FB' }}>Export PDF</button>
    </div>
  );
};

export default Reports;