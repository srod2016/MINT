import { createRequire } from 'module';
import path from 'path';

// --- FIX FOR REQUIRE ERROR ---
const require = createRequire(import.meta.url);
const Database = require('better-sqlite3');

// Connect to DB
// process.cwd() finds the main folder where you run the command
const dbPath = path.join(process.cwd(), 'src/database/mint.db');
const db = new Database(dbPath);

console.log("🌱 Upgrade: Re-Seeding Database...");

try {
    // 1. DROP TABLES (So we can recreate them with new columns)
    db.prepare("DROP TABLE IF EXISTS expenses").run();
    db.prepare("DROP TABLE IF EXISTS budgets").run();
    db.prepare("DROP TABLE IF EXISTS users").run();

    // 2. CREATE USERS TABLE (Robust Login)
    db.prepare(`
        CREATE TABLE users (
            userId INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT -- In real life hash this!
        )
    `).run();

    // 3. CREATE EXPENSES TABLE (With 'description' column)
    db.prepare(`
        CREATE TABLE expenses (
            expenseId INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            categoryId INTEGER,
            amount REAL,
            date TEXT,
            description TEXT
        )
    `).run();

    // 4. CREATE BUDGETS TABLE
    db.prepare(`
        CREATE TABLE budgets (
            budgetId INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER,
            categoryId INTEGER,
            limitAmount REAL,
            period TEXT,
            startDate TEXT,
            endDate TEXT,
            alertThreshold REAL
        )
    `).run();

    // 5. INSERT DEMO DATA
    console.log("... Adding Demo User: student / pass123");
    db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").run('student', 'pass123');

    console.log("... Adding Budget");
    db.prepare(`
        INSERT INTO budgets (userId, categoryId, limitAmount, period, startDate, endDate, alertThreshold)
        VALUES (1, 1, 1000, 'monthly', '2025-11-01', '2025-11-30', 80)
    `).run();

    console.log("... Adding Expenses with Names");
    const insert = db.prepare("INSERT INTO expenses (userId, categoryId, amount, date, description) VALUES (?, ?, ?, ?, ?)");
    
    insert.run(1, 1, 50.00, '2025-11-02', 'Publix Groceries');
    insert.run(1, 2, 120.00, '2025-11-05', 'Meow Gas Station');
    insert.run(1, 1, 15.50, '2025-11-07', 'Chipotle Lunch');
    insert.run(1, 3, 200.00, '2025-11-10', 'Hollister Jeans'); // Category 3 = Shopping

    console.log("DB is set!");

} catch (err) {
    console.error("Error seeding:", err);
}