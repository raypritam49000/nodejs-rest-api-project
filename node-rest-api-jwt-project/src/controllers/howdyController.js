const http = require('http');

const HowdyController = {

    getHowdy: async (req, res) => {
        try {
            res.json({ message: "Welcome to Howdy Controller" });
        } catch (error) {
            return res.status(500).send({ message: error.message, status: http.STATUS_CODES[500], statusCode: 500, success: false });
        }
    }
}

module.exports = HowdyController;