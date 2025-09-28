import express from 'express';
import dotenv from 'dotenv';
import { sql } from './config/db.js';

const app = express();

const PORT = process.env.PORT || 5001;

async function initializeDatabase() {
    try {
        await sql `
        CREATE TABLE IF NOT EXISTS transactions (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            category  VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )
        `

        await sql `
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


app.get("/",(req,res)=>{
    res.send("Hello World");
})

initializeDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
