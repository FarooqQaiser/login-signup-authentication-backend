import express from "express";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";

const router = express.Router();

const JWT_SECRET_KEY = "mySecretJwtKey";

const dbFile = path.join(process.cwd(), "data", "db.json");

const readUsers = () => {
  try {
    const data = JSON.parse(fs.readFileSync(dbFile, "utf-8"));
    return data.users || [];
  } catch (error) {
    console.log("Error reading users: ", error);
    return [];
  }
};

router.post("/loginAuth", async (req, res) => {
  const { email, password } = req.body;

  const users = readUsers();

  const userExists = users.find((user) => user.email === email);
  const isPasswordValid = await bcrypt.compare(password, userExists.password);

  if (!userExists) {
    return res.status(400).json({ error: "Invalid Credentials!" });
  }

  if (!isPasswordValid) {
    return res.status(400).json({ error: "Invalid Credentials!" });
  }

  const user = {
    name: userExists.name,
    email: userExists.email,
  };

  const token = jwt.sign(
    { id: userExists.id, email: userExists.email },
    JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.status(200).json({
    message: "Login Successful!",
    user: user,
    token: token,
  });
});

export default router;
