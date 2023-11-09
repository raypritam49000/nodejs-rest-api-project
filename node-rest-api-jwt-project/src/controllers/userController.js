const http = require('http');
const User = require('../models/user.model');
const UserUtil = require('../utils/userUtil');

const UserController = {

    getProfile: async (req, res) => {
        try {
            const user = req.user.userByEmail;
            user.req_user = true;
            return res.status(202).json({ status: http.STATUS_CODES[202], statusCode: 202, user, message: 'User Profile' });
        } catch (error) {
            return res.status(500).send({ message: error.message, status: http.STATUS_CODES[500], statusCode: 500, success: false });
        }
    },

    getUserById: async (req, res) => {
        try {
            const user = await User.findById({ _id: req.params.userId });
            return res.status(202).json({ status: http.STATUS_CODES[202], statusCode: 202, user, message: 'User Details' });
        } catch (error) {
            return res.status(500).send({ message: error.message, status: http.STATUS_CODES[500], statusCode: 500, success: false });
        }
    }
}

module.exports = UserController;