import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/connection.js";
import router from "./routes/todo.route.js";
import cors from "cors";


const app = express();
dotenv.config();
app.use(cors({
  origin: "http://10.223.4.125:5173", // Only allow React frontend
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Allowed methods
  credentials: true // Allow cookies if needed
}));

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/home/", router);


app.get('/api/home', (req, res) => {
    res.send(`<h1>You are on the Home page.</h1>`)
})

app.listen(process.env.PORT , () => {
    console.log(`server is listning on ${process.env.PORT}`);
})