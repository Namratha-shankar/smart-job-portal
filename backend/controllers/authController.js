import db from "../config/db.js";

// ✅ REGISTER USER
export const register = async (req, res) => {
  const { name, email, password, role, skills } = req.body;

  try {
    // check if user already exists
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // insert user (plain password)
    await db.query(
      "INSERT INTO users (name, email, password, role, skills) VALUES (?, ?, ?, ?, ?)",
      [name, email, password, role, skills]
    );

    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ LOGIN USER (simple version)
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({
      user: rows[0],
      token: "dummy-token",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
};