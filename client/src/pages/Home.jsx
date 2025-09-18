import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import taskLogo from "../assets/task.jpg";
import { getTasks, createTask, toggleTask, deleteTask } from "../apiCalls/tasks.js";

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", category: "" });
  const [filter, setFilter] = useState("all");

  const token = localStorage.getItem("token"); // JWT token

  // Fetch tasks on load
  useEffect(() => {
    if (!token) return;
    const fetchUserTasks = async () => {
      try {
        const data = await getTasks(token);
        setTasks(data);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      }
    };
    fetchUserTasks();
  }, [token]);

  // Add new task
  const handleAddTask = async () => {
    if (!newTask.title || !newTask.category) return alert("Fill all fields");
    try {
      const task = await createTask(newTask, token);
      setTasks([...tasks, task]);
      setNewTask({ title: "", category: "" });
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  // Toggle task completion
  const handleToggle = async (taskId, currentStatus) => {
    try {
      await toggleTask(taskId, !currentStatus, token);
      setTasks(
        tasks.map((t) =>
          t._id === taskId ? { ...t, isDone: !currentStatus } : t
        )
      );
    } catch (err) {
      console.error("Failed to toggle task:", err);
    }
  };

  // Delete task
  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId, token);
      setTasks(tasks.filter((t) => t._id !== taskId));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  // Filter tasks
  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((t) => t.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-100 via-purple-100 to-blue-100 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          {/* <img
            src={taskLogo}
            alt="Taskify Logo"
            className="w-14 h-14 rounded-xl shadow-md"
          /> */}
          <h1 className="text-3xl font-bold text-gray-800">Taskify Dashboard</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 px-6 pb-8">
        {/* Task List */}
        <div className="w-full lg:w-2/3 flex flex-col gap-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Your Tasks</h2>
            <div className="flex gap-2">
              {["all", "work", "personal"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-1 rounded-full text-sm font-medium ${
                    filter === cat
                      ? "bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-md"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Tasks */}
          {filteredTasks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredTasks.map((task) => (
                <div
                  key={task._id}
                  className={`flex justify-between items-center p-4 rounded-xl shadow-md transition hover:shadow-xl ${
                    task.isDone ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <span
                      className={`font-medium text-gray-800 ${
                        task.isDone ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {task.title}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        task.category === "work"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {task.category}
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      checked={task.isDone}
                      onChange={() => handleToggle(task._id, task.isDone)}
                      className="w-6 h-6 accent-purple-500"
                    />
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="text-red-500 hover:text-red-700 font-bold text-lg"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-4">No tasks found.</p>
          )}
        </div>

        {/* Add Task Form */}
        <div className="w-full lg:w-1/3 bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Add New Task</h2>
          <input
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full h-12 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <select
            value={newTask.category}
            onChange={(e) =>
              setNewTask({ ...newTask, category: e.target.value })
            }
            className="w-full h-12 px-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="">Select category</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
          </select>
          <button
            onClick={handleAddTask}
            className="w-full h-12 bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;