import express from "express";
import { handleGetUserByID, handleGetUsers, handleLoginUser, handleRegisterUser, handleUpdate } from "./User.controller.js";

const router = express.Router();

router.get('/users', handleGetUsers);
router.get('/user/:id', handleGetUserByID);
router.post('/user/register', handleRegisterUser);
router.post('/user/login', handleLoginUser);
router.patch('/user/update/:id', handleUpdate);

export default router;