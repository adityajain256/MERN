import mongoose from "mongoose";


async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongoDB connected succefully.')
    } catch (error) {
        console.log(`error in mongoose connection ${error}`)
    }
}

export default connectDB;