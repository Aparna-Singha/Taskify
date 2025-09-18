import axios from "axios";
import { API_BASE_URL } from "./config";

const taskApi = axios.create({
  baseURL: API_BASE_URL + "api/tasks", // note the 'api/tasks' here
  withCredentials: true,
});

// Get all tasks
export const getTasks = async (token) => {
  const response = await axios.get(`${API_BASE_URL}api/tasks`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Create a task
export const createTask = async (taskData, token) => {
  const response = await taskApi.post("", taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Toggle isDone
export const toggleTask = async (taskId, isDone, token) => {
  const response = await taskApi.patch(`/${taskId}`, { isDone }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Delete task
export const deleteTask = async (taskId, token) => {
  const response = await taskApi.delete(`/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};