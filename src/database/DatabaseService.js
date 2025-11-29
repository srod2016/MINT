const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

class DatabaseService {
  constructor(dbPath = './mint.db') {
    this.db = new Database(dbPath);
    this.initializeDatabase();
  }

  initializeDatabase() {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');
    this.db.exec(schema);
  }

  insertBudget(budgetData) {
    const stmt = this.db.prepare(`
      INSERT INTO budgets (userId, categoryId, limitAmount, period, startDate, endDate, alertThreshold)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      budgetData.userId,
      budgetData.categoryId,
      budgetData.limitAmount,
      budgetData.period,
      budgetData.startDate,
      budgetData.endDate,
      budgetData.alertThreshold
    );
    return result.lastInsertRowid;
  }

  getBudgetById(budgetId) {
    const stmt = this.db.prepare('SELECT * FROM budgets WHERE budgetId = ?');
    return stmt.get(budgetId);
  }
  insertExpense(expenseData) {
    const stmt = this.db.prepare(`
      INSERT INTO expenses (userId, categoryId, amount, date)
      VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(
      expenseData.userId,
      expenseData.categoryId,
      expenseData.amount,
      expenseData.date
    );
    return result.lastInsertRowid;
  }

  getExpensesByCategory(userId, categoryId, startDate, endDate) {
    const stmt = this.db.prepare(`
      SELECT * FROM expenses
      WHERE userId = ? AND categoryId = ?
        AND date >= ? AND date <= ?
      ORDER BY date DESC
    `);
    return stmt.all(userId, categoryId, startDate, endDate);
  }

  close() {
    this.db.close();
  }
}

module.exports = DatabaseService;
export default DatabaseService;