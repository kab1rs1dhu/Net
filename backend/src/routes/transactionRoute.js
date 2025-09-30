import express from "express";
import { getTransactionByUserID } from "../controllers/transactionController.js";
import { createTransaction } from "../controllers/transactionController.js";
import { deleteTransaction } from "../controllers/transactionController.js";
import { getSummaryByUserID } from "../controllers/transactionController.js";

const router = express.Router();
router.post("/", createTransaction);
router.get("/summary/:userId", getSummaryByUserID);  // Move summary route before the generic :userId route
router.get("/:userId", getTransactionByUserID);
router.delete("/:id", deleteTransaction);  // Change from :userId to :id

// need to change routes to have a more consistent naming convention. ignore for now

export default router;