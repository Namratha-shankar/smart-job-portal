import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Nammu@123", // put your mysql password
  database: "job_portal",
});

export default pool;