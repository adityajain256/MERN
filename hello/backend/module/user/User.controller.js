import User from './User.model.js';


export const handleGetUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ error: "No users found" });
        }
        return res.status(200).json(users);
    } catch (error) {
        console.error(`error in getting user`, error);
        return res.status(500).json({ error: "Server error" });
    }
}


export const handleRegisterUser = async (req, res) => {
    const { userName, number, password } = req.body; 
    if(!userName){
        return res.status(401).json({message: `userName is required.`})
    }
    if(!number) {
        return res.status(401).json({ message: `number is required.` });

    }
    if(!password) {
        return res.status(401).json({ message: `password is required.` });

    }
    try {
    await User.create({userName, number, password});
    return res.status(200).json({message: "user have been created"})
        
    } catch (error) {
        console.error(`error in register user`, error);
        return res.status(500).json({ error: "Server error" });
    }
}

export const handleGetUserByID = async (req, res) => {
    const { id } = req.params;
    if(!id) return res.status(401).json({message: `id is required`})
    
    try {
        const user = await User.findById(id);
        return res.status(200).json(user);
    } catch (error) {
        console.error(`error in getting user by id`, error);
        return res.status(500).json({ error: "Server error" });
    }
}


export const handleUpdate = async (res, req) => {
    const body = req.body;
    const { id }  = req.params;

    if (!id) return res.status(401).json({ message: `id is required` });
    if(!userName || !number || !password) return ; 
    try {
        await User.findByIdAndUpdate(id, body, {new: true});
        return res.status(200).json({message: "updated successfully"});
    } catch (error) {
            console.error(`error in getting user by id`, error);
            return res.status(500).json({ error: "Server error" });
    }
}

export const handleLoginUser = async (res, req) => {
    const { number, password } = req.body;
    if(!number) return res.status(401).json({message: "number is required! "})
    if(!password) return res.status(401).json({message: "password is required! "})
    try {
        const user = await User.findOne({number: number});
        if(!user) return res.status(401).json({message: "No user is exist with this number."})
        if(user.number = number) return res.status(200).json({message: true})
    } catch (error) {
        console.error(`error in getting user by id`, error);
        return res.status(500).json({ error: "Server error" });
    }
}