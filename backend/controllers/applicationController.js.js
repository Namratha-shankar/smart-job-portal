import db from "../config/db.js";

// APPLY JOB
export const applyJob = (req, res) => {
  const { user_id, job_id } = req.body;

  // check if file uploaded
  if (!req.file) {
    return res.status(400).json("No resume uploaded");
  }

  const resume = req.file.filename;

  db.query(
    "INSERT INTO applications (user_id, job_id, resume) VALUES (?, ?, ?)",
    [user_id, job_id, resume],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json("Applied Successfully");
    }
  );
};

// GET ALL APPLICATIONS (ADMIN)
export const getApplications = (req, res) => {
  db.query("SELECT * FROM applications", (err, data) => {
    if (err) return res.status(500).json(err);

    res.json(data);
  });
};