import express from "express";
import fs, { read } from "fs";
import path from "path";

const router = express.Router();

const dbFile = path.join(process.cwd(), "data", "db.json");

const readUsers = () => {
  try {
    const data = JSON.parse(fs.readFileSync(dbFile, "utf-8"));
    return data.users || []; // ✅ fixed: read from "users"
  } catch (error) {
    console.log("Error reading users:", error);
    return [];
  }
};

const writeTasks = (users) => {
  const data = { users };
  fs.writeFileSync(dbFile, JSON.stringify(data, null, 2), "utf-8");
};

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  const users = readUsers();

  // ✅ use find, not filter
  const targetedUser = users.find((user) => String(user.id) === String(userId));
  if (!targetedUser) {
    return res.status(404).json({ message: "User not found!" });
  }

  const tasks = targetedUser.tasks || [];

  try {
    res.status(200).json({
      message: "Tasks retrieved successfully!",
      tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Task retrieval failed!" });
  }
});

router.post("/addTask", async (req, res) => {
  const { userId, taskName } = req.body;

  const users = readUsers();

  const targetedUser = users.find((user) => user.id === userId);

  if (!targetedUser) {
    return res.status(404).json({ error: "User not found!" });
  }

  const tasks = targetedUser.tasks || [];

  const taskExists = tasks.some((task) => task.taskName === taskName);
  if (taskExists) {
    return res.status(400).json({ error: "Task already exists!" });
  }

  try {
    const newTask = {
      taskId: `task${Date.now()}`,
      taskName: taskName,
    };
    tasks.push(newTask);
    writeTasks(users, targetedUser.id, tasks);
    res.status(201).json({ message: "Task Added Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Task Addition Failed!" });
  }
});

router.put("/editTask/:userId", async (req, res) => {
  const { userId } = req.params;
  const { taskId, editedTaskName } = req.body;
  const users = readUsers();

  const targetedUser = users.find((user) => user.id === userId);

  if (!targetedUser) {
    return res.status(404).json({ message: "User does not exists!" });
  }

  const tasks = targetedUser.tasks;

  if (!tasks) {
    return res
      .status(404)
      .json({ message: "This user does not have any tasks yet!" });
  }

  const targetedUserTask = tasks.find((task) => task.taskId === taskId);
  console.log("targetedUserTask: ", targetedUserTask);

  if (!targetedUserTask) {
    return res
      .status(404)
      .json({ message: "The to be edited task does not exists!" });
  }

  try {
    const updatedTasks = tasks.map((task) => {
      if (task.taskId === taskId) {
        task.taskName = editedTaskName;
        return task;
      } else {
        return task;
      }
    });

    writeTasks(users, userId, updatedTasks);

    res.status(201).json({ message: "Task edited successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "The task could not be edited!" });
  }
});

router.delete("/deleteTask/:userId", async (req, res) => {
  const { userId } = req.params;
  const { taskId } = req.body;

  const users = readUsers();

  const targetedUser = users.find((user) => String(user.id) === String(userId));

  if (!targetedUser) {
    return res.status(404).json({ message: "User not found!" });
  }

  if (!targetedUser.tasks || targetedUser.tasks.length === 0) {
    return res
      .status(404)
      .json({ message: "This user does not have any tasks yet!" });
  }

  const targetedUserTask = targetedUser.tasks.find(
    (task) => task.taskId === taskId
  );

  if (!targetedUserTask) {
    return res.status(404).json({ message: "The task does not exist!" });
  }

  try {
    targetedUser.tasks = targetedUser.tasks.filter(
      (task) => task.taskId !== taskId
    );

    writeTasks(users); // ✅ just save everything

    return res.json({
      message: "Task deleted successfully!",
      tasks: targetedUser.tasks,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Task deletion failed!" });
  }
});

export default router;
