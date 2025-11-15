import express from "express";
import { handleGetUserByID, handleGetUsers, handleRegisterUser, handleUpdate } from "./User.controller.js";

const router = express.Router();

router.get('/users', handleGetUsers);
router.get('/user/:id', handleGetUserByID);
router.post('/user/register', handleRegisterUser);
router.patch('/user/update/:id', handleUpdate);

export default router;