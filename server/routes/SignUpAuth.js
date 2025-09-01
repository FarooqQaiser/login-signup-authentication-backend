import express from "express";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

const router = express.Router();

// ✅ Path to your db.json file
const dbFile = path.join(process.cwd(), "data", "db.json");

// Function to read users from db.json
const readUsers = () => {
  try {
    const data = JSON.parse(fs.readFileSync(dbFile, "utf-8"));
    return data.users || [];
  } catch (error) {
    console.log("Error reading users:", error);
    return []; // If file empty/corrupt, return empty array
  }
};

// Function to write users back to db.json
const writeUsers = (users) => {
  const data = { users };
  fs.writeFileSync(dbFile, JSON.stringify(data, null, 2));
};

// ✅ SIGNUP ROUTE
router.post("/signUpAuth", async (req, res) => {
  const { name, email, password } = req.body;

  const users = readUsers();

  // Check if user already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ error: "User email already exists!" });
  }

  try {
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: Date.now(), // unique ID
      name,
      email,
      password: hashedPassword,
    };

    // Save user
    users.push(newUser);
    writeUsers(users);

    res.status(201).json({ message: "User Registered Successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

export default router;
