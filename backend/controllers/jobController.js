import db from "../config/db.js";

export const getJobs = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM jobs");
    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};