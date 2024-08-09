import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

const secureRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token){
            return res.status(401).json({error: "No Token, Authorized Denied"});
        }
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        if(!decoded){
            return res.status(401).json({error: "Invalide Token"});
        }
        const user = await User.findById(decoded.userId).select("-password");
        if (!user){
            return res.status(401).json({error: "No User Found"});
        }
        req.user=user;
        next();
    } catch (error) {
        console.log("Error in secureRote :", error);
        res.status(500).json({error: "Internal Server Error"});
    }
}
export default secureRoute;

