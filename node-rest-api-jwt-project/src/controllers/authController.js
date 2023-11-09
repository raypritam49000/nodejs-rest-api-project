const User = require("../models/user.model");
const http = require('http');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AuthController = {

    registerUser: async (req, res) => {
        try {
            const userByEmail = await User.findOne({ email: req.body.email });

            if (userByEmail) {
                return res.status(409).json({ message: "Email is Already used with another account", "status": http.STATUS_CODES[409], statusCode: 409, success: false });
            }

            const newUser = new User(req.body);
            newUser.password = await bcrypt.hash(req.body.password, 10);

            const savedUser = await newUser.save();

            return res.status(201).json({ status: http.STATUS_CODES[201], statusCode: 201, data: savedUser, message: 'User has been registered successfully' });

        } catch (error) {
            return res.status(500).send({ message: error.message, status: http.STATUS_CODES[500], statusCode: 500, success: false });
        }
    },

    loginUser: async (req, res) => {
        try {
            const { username, password } = req.body;

            const userByEmail = await User.findOne({ email: username });

            if (!userByEmail) {
                return res.status(404).json({ message: "User does not register. please register first!!!", "status": http.STATUS_CODES[404], statusCode: 404, success: false });
            }

            if (!(await bcrypt.compare(password, userByEmail.password))) {
                return res.status(401).json({ message: "Bad Credentials. Please check your username and password.", status: http.STATUS_CODES[401], statusCode: 401, success: false });
            }

            const token = jwt.sign( {userByEmail}, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

            return res.status(200).json({ status: http.STATUS_CODES[200], statusCode: 200, token: token, message: 'User has been login successfully' });

        } catch (error) {
            return res.status(500).send({ message: error.message, status: http.STATUS_CODES[500], statusCode: 500, success: false });
        }
    }
}

module.exports = AuthController;
