import jwt from "jsonwebtoken";

const createTokenAndSaveCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
        expiresIn: "2d"
    });
    res.cookie("jwt", token, {
        httpOnly: true, // Protect from XSS attack
        secure: true, // Ensure the cookie is sent over HTTPS
        sameSite: "strict" // Correct spelling for the SameSite attribute
    });
};

export default createTokenAndSaveCookie;
