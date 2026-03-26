import db from "../config/db.js";

export const addApplication = async (req, res) => {
  const { job_id, user_id } = req.body;
  const resume = req.file ? req.file.filename : null;

  try {
    await db.query(
      "INSERT INTO applications (job_id, user_id, resume) VALUES ($1, $2, $3)",
      [job_id, user_id, resume]
    );

    res.json({ message: "Application submitted" });
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};