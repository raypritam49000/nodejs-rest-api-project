const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');


const createUser = asyncHandler(async (req, res) => {
    const existUser = await User.findOne({ email: req.body.email });
    if (existUser) {
        throw new Error("User Already Exists!!");
    } else {
        const createUser = await User.create(req.body);
        return res.status(201).json(createUser);
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email });

    if (!existUser) {
        throw new Error("User does not register!!");
    }

    if (existUser && existUser.matchPassword(password)) {
        const token = existUser.generateToken();
        const refreshToken = existUser.getRefreshToken();
        const updateUser = await User.findByIdAndUpdate(
            existUser._id,
            {
                refreshToken: refreshToken
            },
            {
                new: true
            }
        );

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({ ...existUser._doc, token });
    }
    else {
        throw new Error("Password does not match!!");
    }
});


module.exports = { createUser, loginUser };

