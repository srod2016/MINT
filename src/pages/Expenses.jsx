import React, { useState } from 'react';

const Expenses = () => {
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState(''); // NEW: Name/Description
  const [cat, setCat] = useState('1'); 

  const saveExpense = async (e) => {
    e.preventDefault();
    
    await fetch('http://localhost:5000/add-expense', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: parseFloat(amount),
        description: desc, // Sending the name
        categoryId: parseInt(cat)
      })
    });

    alert("Saved: " + desc);
    setAmount('');
    setDesc('');
  };

  return (
    <div className="mint-container">
      <div className="white-card">
        <h3>Add Expense</h3>
        <form onSubmit={saveExpense} style={{ display: 'flex', gap: '10px', flexWrap:'wrap' }}>
          
          {/* NAME FIELD */}
          <div style={{ flex: 2 }}>
            <label className="mint-label">Description / Name</label>
            <input 
              className="mint-input" 
              placeholder="e.g. Publix, Uber, Rent"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
            />
          </div>

          <div style={{ flex: 1 }}>
            <label className="mint-label">Amount</label>
            <input 
              className="mint-input" type="number" placeholder="0.00"
              value={amount} onChange={(e) => setAmount(e.target.value)} required
            />
          </div>

          <div style={{ flex: 1 }}>
            <label className="mint-label">Genre</label>
            <select className="mint-input" value={cat} onChange={(e) => setCat(e.target.value)}>
              <option value="1">Food</option>
              <option value="2">Transport</option>
              <option value="3">Shopping</option>
            </select>
          </div>

          <button className="mint-btn" style={{ width: '100px', height: '46px', alignSelf: 'flex-end' }}>Add</button>
        </form>
      </div>
    </div>
  );
};

export default Expenses;