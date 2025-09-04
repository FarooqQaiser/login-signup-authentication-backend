import express from "express";
import cors from "cors";
import signUpAuthRoutes from "./routes/SignUpAuth.js";
import loginAuthRoutes from "./routes/LoginAuth.js";
import manageTasks from "./routes/ManageTasks.js";

const app = express();
const port = 5000;

app.use(cors({ origin: "*", credentials: true }));

app.use(express.json());

app.use("/auth", signUpAuthRoutes);
app.use("/auth", loginAuthRoutes);
app.use("/tasks", manageTasks);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
