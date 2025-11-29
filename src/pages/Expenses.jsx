import React from 'react';

const Expenses = () => {
  const list = [
    { id: 1, title: 'Grocery', date: '10/24/2025', price: 45.00, tag: 'Food' },
    { id: 2, title: 'Uber', date: '10/23/2025', price: 15.00, tag: 'Transport' },
    { id: 3, title: 'Movies', date: '10/22/2025', price: 20.00, tag: 'Fun' },
    { id: 4, title: 'FPL', date: '10/20/2025', price: 120.00, tag: 'Bills' },
  ];

  return (
    <div className="main-container">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Expenses</h2>
        <button className="my-btn" style={{ width: '100px' }}>+ New</button>
      </div>

      <div className="card">
        {list.map((item) => (
          <div key={item.id} style={{ borderBottom: '1px solid #eee', padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
            
            <div>
              <div style={{ fontWeight: 'bold' }}>{item.title}</div>
              <div style={{ fontSize: '11px', color: 'gray' }}>{item.date} - {item.tag}</div>
            </div>

            <div style={{ color: 'red', fontWeight: 'bold' }}>
              - ${item.price}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Expenses;