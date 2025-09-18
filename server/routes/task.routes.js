import express from "express";
import { getTasks, createTask, toggleTask, deleteTask } from "../controllers/task.controllers.js";
import isAuth from "../middlewares/isAuth.js";

const router = express.Router();

router.get("/", isAuth, getTasks);
router.post("/", isAuth, createTask);
router.patch("/:id", isAuth, toggleTask);
router.delete("/:id", isAuth, deleteTask);

export default router;