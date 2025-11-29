import React, { useState } from 'react';

function Budget() {
  const [budgets] = useState([
    { budgetId: 1, category: 'Food & Dining', limitAmount: 500, currentSpending: 300, percentageUsed: 60, status: 'SAFE' },
    { budgetId: 2, category: 'Transportation', limitAmount: 200, currentSpending: 180, percentageUsed: 90, status: 'WARNING' }
  ]);

  return (
    <div style={{ padding: '32px' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>
        Budget Management
      </h1>
      <p style={{ color: '#64748b', marginBottom: '32px' }}>
        Track your spending and stay on budget
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
        {budgets.map((budget) => (
          <div 
            key={budget.budgetId} 
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              padding: '24px',
              transition: 'box-shadow 0.3s'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '4px' }}>
                  {budget.category}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '14px' }}>Monthly Budget</p>
              </div>
              <span style={{
                padding: '6px 12px',
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: '600',
                backgroundColor: budget.status === 'EXCEEDED' ? '#fee2e2' : budget.status === 'WARNING' ? '#fed7aa' : '#d1fae5',
                color: budget.status === 'EXCEEDED' ? '#991b1b' : budget.status === 'WARNING' ? '#c2410c' : '#065f46'
              }}>
                {budget.status}
              </span>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', marginBottom: '12px' }}>
                <span style={{ color: '#6b7280' }}>Spent</span>
                <span style={{ fontWeight: 'bold', color: '#111827' }}>${budget.currentSpending}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px' }}>
                <span style={{ color: '#6b7280' }}>Budget</span>
                <span style={{ fontWeight: 'bold', color: '#111827' }}>${budget.limitAmount}</span>
              </div>
            </div>

            <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '16px', marginTop: '16px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                borderRadius: '9999px',
                width: `${Math.min(budget.percentageUsed, 100)}%`,
                backgroundColor: budget.status === 'EXCEEDED' ? '#ef4444' : budget.status === 'WARNING' ? '#f97316' : '#10b981',
                transition: 'width 0.3s'
              }}></div>
            </div>
            <p style={{ textAlign: 'right', fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
              {budget.percentageUsed}% used
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Budget;