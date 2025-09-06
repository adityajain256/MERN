//aditya jain
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/connection.js";
import notesRoutes from "./routes/Notes.route.js";


connectDB();
dotenv.config();
const app = express();

//middleware
app.use(express.json());
app.use("/api", notesRoutes);
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello from backend");
})


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})