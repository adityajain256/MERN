import mongoose from "mongoose";
// import User from "./user.model.js";

const habitSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["good", "bad"],
    },
    frequency: {
      type: String,
      // required: true,
      enum: ["daily", "weekly", "monthly"],
      default: "daily",
    },
    startDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
  },
  { timestamps: true }
);

const Habit = mongoose.model('Habit', habitSchema);

export default Habit;
