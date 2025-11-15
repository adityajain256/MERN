import mongoose  from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    number: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        min: 8,

    }
}, {timeStamps: true})


const User = mongoose.model("User", userSchema);

export default User;