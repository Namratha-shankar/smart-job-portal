import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password, role, skills } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name,email,password,role,skills) VALUES (?,?,?,?,?)",
    [name, email, hashed, role, skills],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json("User Registered");
    }
  );
};

export const login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email=?", [email], async (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.json("User not found");

    const valid = await bcrypt.compare(password, data[0].password);
    if (!valid) return res.json("Wrong password");

    const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET);

    res.json({ token, user: data[0] });
  });
};