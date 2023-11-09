const mongoose = require('mongoose');
const verificationSchema = require('./verificationSchema');

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  verification: verificationSchema
});

const User = mongoose.model('User', userSchema);

module.exports = User;




