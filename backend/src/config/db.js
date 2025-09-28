import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
dotenv.config();

// using this, we will be able to make a connection to our database
export const sql = neon(process.env.DATABASE_URL);
export async function initializeDatabase() {
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