import { useEffect, useState } from "react";
import axios from "axios";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [files, setFiles] = useState({}); // store file per job

  useEffect(() => {
    axios.get("https://smart-job-portal-dleh.onrender.com/api/jobs")
      .then(res => setJobs(res.data))
      .catch(err => console.log(err));
  }, []);

  // handle file selection per job
  const handleFileChange = (jobId, file) => {
    setFiles(prev => ({
      ...prev,
      [jobId]: file
    }));
  };

  // apply with resume
  const handleApply = async (jobId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const file = files[jobId];

      if (!file) {
        alert("Please upload resume first");
        return;
      }

      const formData = new FormData();
      formData.append("resume", file);
      formData.append("job_id", jobId);
      formData.append("user_id", user.id);

      await axios.post("https://smart-job-portal-dleh.onrender.com/api/applications", formData);

      alert("Applied Successfully");
    } catch (err) {
      console.log(err);
      alert("Apply Failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Available Jobs</h2>

      <div style={styles.grid}>
        {jobs.map(job => (
          <div key={job.id} style={styles.card}>
            <h3>{job.title}</h3>
            <p><b>Company:</b> {job.company}</p>
            <p><b>Skills:</b> {job.skills_required}</p>
            <p><b>Description:</b> {job.description}</p>

            {/* Upload Resume */}
            <input
              type="file"
              onChange={(e) =>
                handleFileChange(job.id, e.target.files[0])
              }
            />

            <button
              style={styles.button}
              onClick={() => handleApply(job.id)}
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jobs;

const styles = {
  container: {
    padding: "30px",
    backgroundColor: "#f5f7fb",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    background: "green",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
};