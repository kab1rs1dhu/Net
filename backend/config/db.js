import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
dotenv.config();

// using this, we will be able to make a connection to our database
const sql = neon(process.env.DATABASE_URL);
export { sql };