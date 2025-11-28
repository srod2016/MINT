const CalculationService = require('../../src/services/CalculationService');

describe('CalculationService', () => {
  let calcService;

  beforeEach(() => {
    calcService = new CalculationService();
  });

  test('Budget within safe limits (< 80%)', () => {
    const budget = {
      budgetId: 1,
      categoryId: 1,
      limitAmount: 500,
      alertThreshold: 80,
      startDate: '2024-11-01',
      endDate: '2024-11-30'
    };
    
    const expenses = [
      { categoryId: 1, amount: 150, date: '2024-11-05' },
      { categoryId: 1, amount: 150, date: '2024-11-10' }
    ];
    
    const status = calcService.calculateBudgetStatus(budget, expenses);
    
    expect(status.status).toBe('SAFE');
    expect(status.percentageUsed).toBe(60);
    expect(status.currentSpending).toBe(300);
  });
test('Budget exceeded (>= 100%)', () => {
    const budget = {
      budgetId: 1,
      categoryId: 1,
      limitAmount: 500,
      alertThreshold: 80,
      startDate: '2024-11-01',
      endDate: '2024-11-30'
    };
    
    const expenses = [
      { categoryId: 1, amount: 550, date: '2024-11-05' }
    ];
    
    const status = calcService.calculateBudgetStatus(budget, expenses);
    
    expect(status.status).toBe('EXCEEDED');
    expect(status.percentageUsed).toBe(110);
  });

});