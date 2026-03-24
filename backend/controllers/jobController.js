import db from "../config/db.js";

export const addJob = (req, res) => {
  const { title, company, skills_required, description } = req.body;

  db.query(
    "INSERT INTO jobs (title,company,skills_required,description) VALUES (?,?,?,?)",
    [title, company, skills_required, description],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json("Job added");
    }
  );
};

export const getJobs = (req, res) => {
  const userSkills = req.query.skills?.split(",") || [];

  db.query("SELECT * FROM jobs", (err, jobs) => {
    if (err) return res.status(500).json(err);

    const updatedJobs = jobs.map(job => {
      const required = job.skills_required.split(",");

      const match = required.some(skill =>
        userSkills.includes(skill)
      );

      return {
        ...job,
        match: match ? "Good Match" : "Low Match"
      };
    });

    res.json(updatedJobs);
  });
};