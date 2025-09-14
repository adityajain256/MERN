import Habit from "../models/habits.model.js";

export const handleGetAllHabits = async (req, res) => {
    try {
        const habits = await Habit.find();

        res.status(200).json(habits)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const handleCreateHabit = async (req, res) => {
    const data = req.body;

    // Validate required fields
    if (!data.title || !data.frequency || !data.type || !data.startDate) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const habit = await Habit.create(data);
        res.status(201).json(habit);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export const handleGetHabitById = async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        if (!habit) {
            return res.status(404).json({ message: "Habit not found" });
        }
        res.status(200).json(habit);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

export const handleUpdateHabit = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const habit = await Habit.findByIdAndUpdate(id, data, { new: true });
        if (!habit) {
            return res.status(404).json({ message: "Habit not found" });
        }
        res.status(200).json(habit);
    } catch (error) {
        res.status(500).json({ message: "Server Error"});
    }
}

export const handleDeleteHabit = async (req, res) => {
    const { id } = req.params;

    try {
        const habit = await Habit.findByIdAndDelete(id);
        if (!habit) {
            return res.status(404).json({ message: "Habit not found" });
        }
        res.status(200).json({ message: "Habit deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}