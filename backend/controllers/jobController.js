import db from "../config/db.js";

// ✅ Get all jobs
export const getJobs = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM jobs");
    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Add new job
export const addJob = async (req, res) => {
  try {
    const { title, company, skills_required, description } = req.body;

    const query = `
      INSERT INTO jobs (title, company, skills_required, description)
      VALUES (?, ?, ?, ?)
   `;

    await db.query(query, [title, company, skills_required, description]);

    res.json({ message: "Job added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};