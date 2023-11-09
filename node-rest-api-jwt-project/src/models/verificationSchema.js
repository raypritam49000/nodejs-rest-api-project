const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
    status: {
        type: Boolean,
        default: false,
    },
    startedAt: Date,
    endsAt: Date,
    planType: String,
}, { _id: false });

module.exports = verificationSchema;