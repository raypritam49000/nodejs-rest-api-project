const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        throw new Error(error);
    }
});

const getUserById = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id;

        // Check if req.params.id is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error("Invalid user ID");
        }

        const user = await User.find({ _id: userId });

        if (user.length === 0) {
            throw new Error("User not found");
        }

        return res.status(200).json({ getUser: user[0] });
    } catch (error) {
        throw new Error(error);
    }
});

const deleteUserById = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id;

        // Check if req.params.id is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error("Invalid user ID");
        }

        const user = await User.findByIdAndDelete(userId);

        return res.status(200).json({ deleteUser: user });
    } catch (error) {
        throw new Error(error);
    }
});

const updateUserById = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id;

        // Check if req.params.id is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error("Invalid user ID");
        }

        const user = await User.findByIdAndUpdate(userId, req.body, { new: true });

        return res.status(200).json(user);
    } catch (error) {
        throw new Error(error);
    }
});


const blockUser = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id;

        // Check if req.params.id is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error("Invalid user ID");
        }

        const blockUser = await User.findByIdAndUpdate(
            userId,
            {
                isBlocked: true
            },
            {
                new: true
            }
        );

        return res.status(200).json({ message: "User Blocked" });
    } catch (error) {
        throw new Error(error);
    }
});


const unBlockUser = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id;

        // Check if req.params.id is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error("Invalid user ID");
        }

        const unBlockUser = await User.findByIdAndUpdate(
            userId,
            {
                isBlocked: false
            },
            {
                new: true
            }
        );

        return res.status(200).json({ message: "User UnBlocked" });
    } catch (error) {
        throw new Error(error);
    }
});

const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;

    if (!cookie?.refreshToken) throw new Error('No Refresh Token in Cookies');
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });

    if (!user) throw new Error('No Refresh Token in parent in db or not matched');
    const userFromRefreshToken = await jwt.verify(refreshToken, process.env.JWT_SECRET);

    if (user._id.toString() !== userFromRefreshToken.id) {
        throw new Error('There is something wrong with refresh token');
    }
    else {
        const userData = { id: user._id.toString(), firstName: user.firstName, lastName:user.lastName, email: user.email, mobile: user.mobile, role: user.role, card: user.card, address: user.address, wishlist: user.wishlist, createdAt: user.createdAt, updatedAt: user.updatedAt, isBlocked: user.isBlocked };
        const accessToken = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "1d" })
        return res.status(200).json({ accessToken });
    }
});


module.exports = { getAllUsers, getUserById, deleteUserById, updateUserById, blockUser, unBlockUser, handleRefreshToken };