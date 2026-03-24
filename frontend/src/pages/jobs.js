import { useEffect, useState } from "react";
import axios from "axios";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/jobs")
      .then(res => setJobs(res.data))
      .catch(err => console.log(err));
  }, []);

  const applyJob = async (jobId) => {
    const userData = localStorage.getItem("user");

    if (!userData) {
      alert("Please login first");
      return;
    }

    let user;
    try {
      user = JSON.parse(userData);
    } catch {
      alert("Session expired, login again");
      localStorage.clear();
      return;
    }

    if (!file) {
      alert("Upload resume first");
      return;
    }

    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("job_id", jobId);
    formData.append("resume", file);

    try {
      await axios.post("http://localhost:5000/api/applications", formData);
      alert("Applied Successfully");
    } catch (err) {
      console.log(err);
      alert("Apply Failed");
    }
  };

  return (
    <div style={styles.container}>

      <h2 style={styles.heading}>Available Jobs</h2>

      {/* Resume Upload */}
      <div style={styles.uploadBox}>
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files[0])} 
        />
      </div>

      {/* Job Cards */}
      <div style={styles.grid}>
        {jobs.map((job) => (
          <div key={job.id} style={styles.card}>
            <h3>{job.title}</h3>
            <p><b>Company:</b> {job.company}</p>
            <p><b>Skills:</b> {job.skills_required}</p>
            <p><b>Match:</b> {job.match}</p>

            <button 
              style={styles.button}
              onClick={() => applyJob(job.id)}
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  uploadBox: {
    textAlign: "center",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    background: "#fff",
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }
};

export default Jobs;