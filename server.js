import express from 'express';
import cors from 'cors';
import { createRequire } from 'module';

// --- FIX FOR REQUIRE ERROR ---
// Found this online. My teammate used 'require' but I am using 'import'
// so I have to make a custom require function to load his files.
const require = createRequire(import.meta.url);

const DatabaseService = require('./src/database/DatabaseService.js');
const BudgetService = require('./src/services/BudgetService.js');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// database path
const dbPath = path.join(process.cwd(), 'src/database/mint.db'); // Use process.cwd to be safe
console.log("DB Path:", dbPath);

// Try to connect
let db;
let budgetService;

try {
    db = new DatabaseService(dbPath);
    budgetService = new BudgetService(db);
    console.log("Database connected!");
} catch (e) {
    console.log("DB Error:", e);
}

// --- API ROUTES ---

// Get budget status for the report page
app.get('/get-budget-status', (req, res) => {
    console.log("Frontend wants budget status...");

    try {
        // Just using ID 1 for the demo
        const userId = 1; 
        const budgetId = 1;

        let myBudget = db.getBudgetById(budgetId);

        // If no budget, make a fake one so demo doesn't crash
        if (!myBudget) {
            console.log("Making a default budget...");
            budgetService.createBudget(userId, 1, 500, 'monthly', 80);
            myBudget = db.getBudgetById(budgetId);
        }

        // Get the expenses
        const expenses = db.getExpensesByCategory(userId, 1, myBudget.startDate, myBudget.endDate);
        
        // Calculate
        const status = budgetService.getBudgetStatus(budgetId, expenses);
        
        console.log("Status is:", status);
        res.json(status);

    } catch (err) {
        console.log("Error getting status:", err);
        // Send safe fallback data
        res.json({ status: "SAFE", currentSpending: 0, percentageUsed: 0 });
    }
});

// Add new expense
app.post('/add-expense', (req, res) => {
    console.log("Saving expense:", req.body);
    
    try {
        // Default to food category (ID 1)
        const result = db.insertExpense({
            userId: 1,
            categoryId: 1, 
            amount: req.body.amount,
            date: new Date().toISOString().split('T')[0]
        });
        
        res.json({ success: true, id: result });
    } catch (err) {
        console.log(err);
        res.status(500).send("Failed");
    }
});

// Run server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});