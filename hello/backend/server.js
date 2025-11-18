import express from 'express';
import { createServer } from "node:http";
import { Server } from "socket.io"
import dotenv from 'dotenv';
import router from './module/user/User.route.js';
import connectDB from './core/db/db.js';
import cors from 'cors'

dotenv.config();

const app = express();
const server = createServer(app);

// allow requests from the frontend (no trailing slash)
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';

// enable CORS for Express routes
app.use(cors({ origin: FRONTEND_ORIGIN, credentials: true , methods: ["GET", "POST"]}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);

connectDB();

const io = new Server(server, {
  cors: {
    origin: FRONTEND_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log('a user connected', socket.id)

  // Relay incoming chat messages to all connected clients
  socket.on('chat message', (msg) => {
    // simple broadcast
    io.emit('chat message', msg)
  })

  socket.on('disconnect', (reason) => {
    console.log('user disconnected', socket.id, reason)
  })
})

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send(`<h2> Hello everyone from hello</h2>`)
})

// start the http server that Socket.IO is attached to
server.listen(port, () => {
  console.log(`server is running on ${port}`)
});