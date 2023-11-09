const jwt = require("jsonwebtoken");
const asyncHandler = require('express-async-handler');

exports.isAuthenticated = async (req, res, next) => {
    try {
        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({ message: "Please login first" });
        }

        // Remove the "Bearer " prefix from the token string
        const tokenWithoutBearer = token.replace("Bearer ", "");

        const user = await jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);

        req.user = user;

        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.isAdmin = asyncHandler(async (req, res, next) => {
        if (req?.user?.role !== "admin") {
            throw new Error("You are not an admin")
        }
        else {
            next();
        }
});
