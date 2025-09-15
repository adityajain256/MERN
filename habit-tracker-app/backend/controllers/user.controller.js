import User from "../models/user.model.js";
import bcrypt from "bcrypt";


export const handleGetAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);
        // res.status(200).json({message: `us`});

    } catch (error) {
        res.status(500).json({message: `error in getting all users ${error}`})
    }
};

export const handleGetUserById = async (req, res) => {
    try {
        const id = req.params;

        const user = await User.findById(id);

        res.status(200).json(user);

        if(!id){
            res.status(400).json({message: `id must be required.`})
        }

        res.status(200).json({message: "user have been fetched."})
    } catch (error) {
        res.status(500).json({message: `error in getting user by id ${error}`})
    }
};

export const handleCreateUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const saltRounds = 10;
        // console.log({fullName, email, password});
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await User.create({
          fullName: fullName,
          email: email,
          password: hashedPassword,
        });
        res.status(201).json({message: `user have been created.`})
    } catch (error) {
        res.status(500).json({message: `error in creating user ${error}`});
    }
};

export const handleUpdateUser = async (req, res) => {
    try {
        const { id }= req.params;

        

        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findByIdAndUpdate(id, {password: hashedPassword});

        res.status(200).json({message: `user password have been updated.`})
        if (!id) {
          return res.status(400).json({ message: `id must be required.` });
        }
        

    } catch (error) {
        res.status(500).json({ message: `error in updating user ${error}` });
    }
}

export const handleLoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email: email});

        const isVarified = await bcrypt.compare(password, user.password);

        res.status(200).json({isVarified});
    } catch (error) {
        console.log(`error in login user ${error}`);
        res.status(500).json({message: `error in login user ${error}`});
    }
};

export const handleDeleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        await User.findByIdAndDelete(id);
        if(!id){
            console.log(`id should be there.`)
        }
        res.status(200).json({message: `user have been deleted.`})
    } catch (error) {
        console.log(`error in login user ${error}`);
        
    }
};