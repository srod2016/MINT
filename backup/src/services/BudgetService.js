const CalculationService = require('./CalculationService');

class BudgetService {
  constructor(databaseService) {
    this.db = databaseService;
    this.calc = new CalculationService();
  }

  createBudget(userId, categoryId, limitAmount, period, alertThreshold = 80) {
    if (limitAmount <= 0) {
      throw new Error("Budget limit must be positive");
    }
    if (!["weekly", "monthly"].includes(period)) {
      throw new Error("Period must be 'weekly' or 'monthly'");
    }

    const { startDate, endDate } = this.calculateBudgetPeriod(period);

    return this.db.insertBudget({
      userId,
      categoryId,
      limitAmount,
      period,
      startDate,
      endDate,
      alertThreshold
    });
  }

  calculateBudgetPeriod(period) {
    const today = new Date();
    let startDate, endDate;

    if (period === "weekly") {
      startDate = new Date(today);
      startDate.setDate(today.getDate() - today.getDay());
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
    } else {
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    }

    return { 
      startDate: startDate.toISOString().split('T')[0], 
      endDate: endDate.toISOString().split('T')[0] 
    };
  }
  getBudgetStatus(budgetId, expenses) {
    const budget = this.db.getBudgetById(budgetId);
    if (!budget) {
      throw new Error("Budget not found");
    }
    return this.calc.calculateBudgetStatus(budget, expenses);
  }

updateBudget(budgetId, limitAmount, alertThreshold) {
    if (limitAmount <= 0) {
      throw new Error("Budget limit must be positive");
    }
    if (alertThreshold < 0 || alertThreshold > 100) {
      throw new Error("Alert threshold must be between 0 and 100");
    }

    const stmt = this.db.db.prepare(`
      UPDATE budgets 
      SET limitAmount = ?, alertThreshold = ?
      WHERE budgetId = ?
    `);
    return stmt.run(limitAmount, alertThreshold, budgetId);
  }

  deleteBudget(budgetId) {
    const stmt = this.db.db.prepare('DELETE FROM budgets WHERE budgetId = ?');
    return stmt.run(budgetId);
  }
}
module.exports = BudgetService;