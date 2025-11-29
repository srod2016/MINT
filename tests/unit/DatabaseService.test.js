const DatabaseService = require('../../src/database/DatabaseService');
const fs = require('fs');

describe('DatabaseService', () => {
  let db;
  const testDbPath = './test.db';

  beforeEach(() => {
    if (fs.existsSync(testDbPath)) fs.unlinkSync(testDbPath);
    db = new DatabaseService(testDbPath);
  });

  afterEach(() => {
    db.close();
    if (fs.existsSync(testDbPath)) fs.unlinkSync(testDbPath);
  });

  test('Insert and retrieve budget', () => {
    const budgetId = db.insertBudget({
      userId: 1,
      categoryId: 1,
      limitAmount: 500,
      period: 'monthly',
      startDate: '2024-11-01',
      endDate: '2024-11-30',
      alertThreshold: 80
    });

    const budget = db.getBudgetById(budgetId);
    expect(budget.limitAmount).toBe(500);
    expect(budget.period).toBe('monthly');
  });
});