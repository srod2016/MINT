const BudgetService = require('../../src/services/BudgetService');
const DatabaseService = require('../../src/database/DatabaseService');
const fs = require('fs');

describe('BudgetService', () => {
  let db, budgetService;
  const testDbPath = './test.db';

  beforeEach(() => {
    if (fs.existsSync(testDbPath)) fs.unlinkSync(testDbPath);
    db = new DatabaseService(testDbPath);
    budgetService = new BudgetService(db);
  });

  afterEach(() => {
    db.close();
    if (fs.existsSync(testDbPath)) fs.unlinkSync(testDbPath);
  });

  test('Create valid monthly budget', () => {
    const budgetId = budgetService.createBudget(1, 1, 500, 'monthly', 80);
    expect(budgetId).toBeGreaterThan(0);

    const budget = db.getBudgetById(budgetId);
    expect(budget.limitAmount).toBe(500);
    expect(budget.period).toBe('monthly');
  });

  test('Reject negative budget limit', () => {
    expect(() => {
      budgetService.createBudget(1, 1, -100, 'monthly', 80);
    }).toThrow('Budget limit must be positive');
  });

  test('Reject invalid period', () => {
    expect(() => {
      budgetService.createBudget(1, 1, 500, 'yearly', 80);
    }).toThrow("Period must be 'weekly' or 'monthly'");
  });
});