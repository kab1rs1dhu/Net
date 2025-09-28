import express from 'express';
import rateLimiter from './middleware/rateLimiter.js';
import transactionsRoute from './routes/transactionRoute.js';
import { initializeDatabase } from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Trust proxy to get real IP addresses (important for rate limiting)
app.set('trust proxy', true);

// this will act as our middleware. it will parse the incoming request body
app.use(rateLimiter);
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.use("/api/transactions", transactionsRoute);

initializeDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
