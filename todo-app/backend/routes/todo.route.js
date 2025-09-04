import express from "express";
import { handleCompeletedTodos, handleDeleteTodos, handleGetTodos, handlePatchTodos, handlePostTodos } from "../controllers/todo.controller.js";

const router = express.Router();

router.get("/todos",handleGetTodos );
router.post("/todos", handlePostTodos);
router.delete("/todos/:id", handleDeleteTodos);
router.patch("/todos/:id", handlePatchTodos);
router.patch("/todos/:id/completed", handleCompeletedTodos);

export default router;