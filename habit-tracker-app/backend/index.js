import express from 'express';
import habitRouter from './routes/habits.route.js';
import userRouter from './routes/user.route.js';
import connectDB from './config/connect.js';
import dotenv from 'dotenv';


dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/home", userRouter);
app.use("/api/home", habitRouter);

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
