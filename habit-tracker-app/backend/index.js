import express from 'express';
import connectDB from './config/connect.js';
import dotenv from 'dotenv';


dotenv.config();
const app = express();
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
