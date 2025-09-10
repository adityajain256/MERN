//aditya jain
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/connection.js";
import router from "./routes/Notes.route.js";
const PORT = process.env.PORT || 3000;

connectDB();
dotenv.config();
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.get("/", (req, res) => {
    res.send("Hello from backend");
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})