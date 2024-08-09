
import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import createTokenAndSaveCookie from "../jwt/GenerateToken.js"

export const signup = async (req, res) => {
    const { fullname, email, password, confirmPassword } = req.body;
    try {
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: " User already registered" });
        }
        // Hashing password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            fullname,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        if (newUser) {
            createTokenAndSaveCookie(newUser._id, res);
            res.status(201).json({ message: "User created successfully", 
                user: {
                    _id: newUser._id,
                    fullname: newUser.fullname,
                    email: newUser.email
                },
             });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid user credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid user credentials" });
        }
        createTokenAndSaveCookie(user._id, res);
        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email
            },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(201).json({ message: "User logged out successfully" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export const allUsers = async (req, res) => {
    try {
        const loggedInUsers = req.user._id;
        const filteredUsers = await User.find({_id:{$ne: loggedInUsers}}).select("-password");
        res.status(201).json(filteredUsers);
    } catch (error) {
        console.log("Error in allUsers Controller : " + error )
    }
}
