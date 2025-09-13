import express from 'express';

const userRouter = express.Router();


userRouter.get("/user");
userRouter.post("/user");
userRouter.patch("/user/:id");
userRouter.delete("/user:id");


export default userRouter;