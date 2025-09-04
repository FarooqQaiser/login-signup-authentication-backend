import express from "express";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

const router = express.Router();

const dbFile = path.join(process.cwd(), "data", "db.json");

const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(dbFile)) {
  fs.writeFileSync(dbFile, JSON.stringify({ users: [] }, null, 2), "utf-8");
}

const readUsers = () => {
  try {
    if (!fs.existsSync(dbFile)) {
      return [];
    }
    const raw = fs.readFileSync(dbFile, "utf-8");
    if (!raw.trim()) return [];

    const data = JSON.parse(raw);
    return data.users || [];
  } catch (error) {
    console.error("Error reading users: ", error);
  }
};

const writeUsers = (users) => {
  try {
    const data = { users };
    fs.writeFileSync(dbFile, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing users: ", error);
  }
};

router.post("/signUpAuth", async (req, res) => {
  const { name, email, password } = req.body;

  const users = readUsers();

  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ error: "User email already exists!" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      tasks: [],
    };

    const updatedUsers = [...users, newUser]; // ✅ don't overwrite
    writeUsers(updatedUsers);

    res.status(201).json({ message: "User Registered Successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

export default router;
