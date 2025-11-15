import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
    const auth = req.headers["Authorization"];
    console.log(auth)
    if (!auth) {
        return res.status(401).json({ message: "Unauthorized: No token provided or token expired" });
    }
    try {
        const token = jwt.verify(auth.split(" ")[1], process.env.JWT_seceret);
        req.user = token;
        next();
    } catch (error) {
        console.log(`error in authentication ${error}`);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
}