import { useEffect, useState } from "react";
import axios from "axios";

function Applications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/applications")
      .then(res => setApps(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>My Applications</h2>

      {apps.map(app => (
        <div key={app.id}>
          <p>User ID: {app.user_id}</p>
          <p>Job ID: {app.job_id}</p>
          <p>Resume: {app.resume}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Applications;