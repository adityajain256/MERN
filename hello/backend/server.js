import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import connectDB from './core/db/db.js';
import router from './module/user/User.route.js';
const app = express();
dotenv.config();
connectDB();


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', router);

const port = process.env.PORT || 4000;

app.get('/home/', (req, res) => {
    res.send(`<h2> Hello everyone from hello</h2>`)
})

app.listen(port, () => {
    console.log(`server is running of ${port}`)
})