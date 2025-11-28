CREATE TABLE IF NOT EXISTS budgets (
    budgetId INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    categoryId INTEGER NOT NULL,
    limitAmount REAL NOT NULL,
    period TEXT CHECK(period IN ('weekly', 'monthly')),
    startDate TEXT NOT NULL,
    endDate TEXT NOT NULL,
    alertThreshold REAL DEFAULT 80.0
);

CREATE TABLE IF NOT EXISTS expenses (
    expenseId INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    categoryId INTEGER NOT NULL,
    amount REAL NOT NULL,
    date TEXT NOT NULL
);