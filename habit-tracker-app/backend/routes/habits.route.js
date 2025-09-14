import express from 'express';
import {
  handleGetAllHabits,
  handleCreateHabit,
  handleGetHabitById,
  handleUpdateHabit,
  handleDeleteHabit
} from "../controllers/habits.controller.js";

const habitRouter = express.Router();

habitRouter.get("/habits", handleGetAllHabits);
habitRouter.get("/habits/:id", handleGetHabitById);

habitRouter.post("/habits", handleCreateHabit);

habitRouter.patch("/habits/:id", handleUpdateHabit);

habitRouter.delete("/habits/:id", handleDeleteHabit);

export default habitRouter;