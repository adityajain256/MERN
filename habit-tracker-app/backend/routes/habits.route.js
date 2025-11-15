import express from 'express';
import {
  handleGetAllHabits,
  handleCreateHabit,
  handleGetHabitById,
  handleUpdateHabit,
  handleDeleteHabit
} from "../controllers/habits.controller.js";
import { isAuthenticated } from '../middlewares/auth.middleware.js';

const habitRouter = express.Router();

habitRouter.get("/habits", isAuthenticated, handleGetAllHabits);
habitRouter.get("/habits/:id", isAuthenticated, handleGetHabitById);

habitRouter.post("/habits", isAuthenticated, handleCreateHabit);

habitRouter.patch("/habits/:id", isAuthenticated, handleUpdateHabit);

habitRouter.delete("/habits/:id", isAuthenticated, handleDeleteHabit);

export default habitRouter;