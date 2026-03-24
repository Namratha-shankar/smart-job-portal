import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/login";
import Jobs from "./pages/jobs";

function App() {
  return (
    <BrowserRouter>
      <div style={styles.container}>

        {/* Navbar */}
        <div style={styles.navbar}>
          <h2>Smart Job Portal</h2>
          <div>
            <Link to="/" style={styles.link}>Login</Link>
            <Link to="/jobs" style={styles.link}>Jobs</Link>
          </div>
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/jobs" element={<Jobs />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

const styles = {
  container: {
    fontFamily: "Arial",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    background: "#222",
    color: "#fff",
  },
  link: {
    color: "#fff",
    marginLeft: "15px",
    textDecoration: "none",
    fontWeight: "bold"
  }
};

export default App;