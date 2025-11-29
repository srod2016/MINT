const BudgetService = require('../../src/services/BudgetService');
const DatabaseService = require('../../src/database/DatabaseService');
const fs = require('fs');

describe('Budget Integration', () => {
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

  test('Budget status updates when expenses added', () => {
    const budgetId = budgetService.createBudget(1, 1, 500, 'monthly', 80);

// Get the budget to see its actual dates
const budget = db.getBudgetById(budgetId);

db.insertExpense({
  userId: 1,
  categoryId: 1,
  amount: 250,
  date: budget.startDate  // Use budget's actual start date
});

const expenses = db.getExpensesByCategory(1, 1, budget.startDate, budget.endDate);
    const status = budgetService.getBudgetStatus(budgetId, expenses);

    expect(status.status).toBe('SAFE');
    expect(status.currentSpending).toBe(250);
    expect(status.percentageUsed).toBe(50);
  });
});