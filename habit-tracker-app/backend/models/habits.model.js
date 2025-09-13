import mongoose from "mongoose";
import User from "./user.model.js";

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
      required: true,
      enum: ["daily", "weekly", "monthly"],
      default: "daily",
    },
    goal: {
      type: Number,
      required: true,
      min: 1,
    },
    startDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    history: [
      {
        date: { type: Date, required: true },
        status: { type: String, enum: ["completed", "missed"], required: true },
      },
    ],
  },
  { timestamps: true }
);

const Habit = mongoose.model('Habit', habitSchema);

export default Habit;
