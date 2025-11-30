import express from 'express';
import cors from 'cors';
import { createRequire } from 'module';
import path from 'path';

const require = createRequire(import.meta.url);
const Database = require('better-sqlite3'); // Using direct DB for simpler student demo

const app = express();
app.use(cors());
app.use(express.json());

// Direct Connection (Easiest for the demo)
const dbPath = path.join(process.cwd(), 'src/database/mint.db');
const db = new Database(dbPath);

// --- 1. ROBUST LOGIN ROUTE ---
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log("Login attempt:", username);

    const user = db.prepare("SELECT * FROM users WHERE username = ? AND password = ?").get(username, password);

    if (user) {
        res.json({ success: true, userId: user.userId });
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
});

// --- 2. GET EXPENSES (For Reports & Graphs) ---
app.get('/get-expenses', (req, res) => {
    // Get all expenses to calculate totals per genre (category)
    const expenses = db.prepare("SELECT * FROM expenses").all();
    res.json(expenses);
});

// --- 3. ADD EXPENSE (With Name) ---
app.post('/add-expense', (req, res) => {
    console.log("New Expense:", req.body);
    try {
        const result = db.prepare(`
            INSERT INTO expenses (userId, categoryId, amount, date, description) 
            VALUES (?, ?, ?, ?, ?)
        `).run(1, req.body.categoryId, req.body.amount, new Date().toISOString().split('T')[0], req.body.description);
        
        res.json({ success: true, id: result.lastInsertRowid });
    } catch (e) {
        console.log(e);
        res.status(500).send("Error");
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});