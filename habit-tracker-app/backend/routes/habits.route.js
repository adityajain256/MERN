import express from 'express';

const habitRouter = express.Router();

habitRouter.get("/habit");
habitRouter.post("/habit");
habitRouter.patch("/habit/:id");
habitRouter.delete("/habit/:id");


export default habitRouter;