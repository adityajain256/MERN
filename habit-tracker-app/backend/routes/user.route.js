import express from 'express';
import {
  handleGetAllUsers,
  handleGetUserById,
  handleCreateUser,
  handleUpdateUser,
  handleDeleteUser,
  handleLoginUser,
} from "../controllers/user.controller.js";
const userRouter = express.Router();


userRouter.get("/users", handleGetAllUsers);
userRouter.get("/user/:id", handleGetUserById);


userRouter.post("/user/register", handleCreateUser);
userRouter.post("/user/login", handleLoginUser)


userRouter.patch("/user/:id", handleUpdateUser);
userRouter.delete("/user/:id", handleDeleteUser);


export default userRouter;