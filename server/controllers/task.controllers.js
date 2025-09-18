import Task from "../models/task.model.js";

// Get all tasks for the logged-in user
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    console.error("Get Tasks Error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!title) return res.status(400).json({ error: "Title is required" });
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

    const task = new Task({
      title,
      category: category || "general",
      user: req.userId, // attach logged-in user
    });

    const savedTask = await task.save(); // explicitly save
    console.log("Saved task:", savedTask); // log to backend
    res.status(201).json(savedTask);

  } catch (err) {
    console.error("Create Task Error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Toggle task completion
export const toggleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    // Check ownership
    if (task.user.toString() !== req.userId) {
      return res.status(403).json({ error: "Not authorized" });
    }

    task.isDone = !task.isDone;
    await task.save();

    res.status(200).json(task);
  } catch (err) {
    console.error("Toggle Task Error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    // Check ownership
    if (task.user.toString() !== req.userId) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await task.deleteOne();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Delete Task Error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};