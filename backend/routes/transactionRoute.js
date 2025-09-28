import express from "express";
import { getTransactionByUserID } from "../controllers/transactionController.js";
import { createTransaction } from "../controllers/transactionController.js";
import { deleteTransaction } from "../controllers/transactionController.js";
import { getSummaryByUserID } from "../controllers/transactionController.js";

const router = express.Router();
router.post("/", createTransaction);
router.get("/:userId", getTransactionByUserID);
router.get("/:userId/summary", getSummaryByUserID);
router.delete("/:userId", deleteTransaction);

export default router;