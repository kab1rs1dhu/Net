import express from 'express';
import dotenv from 'dotenv';
import { sql } from './config/db.js';

const app = express();

// this will act as our middleware. it will parse the incoming request body
app.use(express.json());

const PORT = process.env.PORT || 5001;

async function initializeDatabase() {
    try {
        await sql`
        CREATE TABLE IF NOT EXISTS transactions (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            category  VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )
        `

        await sql`
            CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`

        console.log('Database initialized successfully.');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); // status code 1 means failure 
    }
}


app.get("/", (req, res) => {
    res.send("Hello World");
})

app.post("/api/transactions", async (req, res) => {
    // a title would consist of the title, category, amount, user_id
    try {
        const { title, amount, category, user_id } = req.body;
        if (!title || amount === undefined || !category || !user_id) {
            return res.status(400).json({ message: "Bad request: All fields are required" });
        }

        const transaction = await sql`
            INSERT INTO transactions (user_id, title, amount, category)
            VALUES (${user_id}, ${title}, ${amount}, ${category})
            RETURNING *
        `

        res.status(201).json({ message: "Transaction created successfully" });

    } catch (error) {
        console.error("Error creating transaction:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/api/transactions/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const transactions = await sql`
            SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC
        `;

        // no need to handle the case where there are no transactions, just return an empty array
        // as a new user will not have any transactions
        res.status(200).json({ transactions });


    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


app.delete("/api/transactions/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await sql`
            DELETE FROM transactions WHERE id = ${id} RETURNING *
        `;

        // result will have a count property that tells us how many rows were affected
        if (result.length === 0) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        res.status(200).json({ message: "Transaction deleted successfully" });

    }
    catch (error) {
        console.error("Error deleting transaction:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/api/transactions/summary/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        
        const balanceResult = await sql`
        SELECT COALESCE(SUM(amount), 0) as balance FROM transactions WHERE user_id = ${userId}
        `;

        const incomeResult = await sql`
        SELECT COALESCE(SUM(amount), 0) as income FROM transactions
        WHERE user_id = ${userId} AND amount > 0
        `;

        const expensesResult = await sql`
        SELECT COALESCE(SUM(amount), 0) as expenses FROM transactions
        WHERE user_id = ${userId} AND amount < 0
        `;

        res.status(200).json({
            balance: balanceResult[0].balance,
            income: incomeResult[0].income,
            expenses: expensesResult[0].expenses,
        });

        res.status(200).json({ summary: summary[0] });
    }
    catch (error) {
        console.error("Error fetching transaction summary:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

initializeDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
