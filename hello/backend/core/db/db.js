import mongoose from 'mongoose';

const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("database connected.")
    } catch (error) {
        console.log(`some error occur in db.js ${error}`)
    }
}

export default connectDB;