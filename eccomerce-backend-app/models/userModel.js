const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    mobile: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        unique: true
    },
    role: {
        type: String,
        default: "user"
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    card: {
        type: Array,
        default: []
    },
    address: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    refreshToken: {
        type: String
    }
}, {
    timestamps: true
});

userSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        this.password = await bcryptjs.hash(this.password, 10);
    }
    next();
});

userSchema.methods.matchPassword = async function (password) {
    return await bcryptjs.compare(password, this.password);
}

userSchema.methods.generateToken = function () {
    const user = { id: this._id, firstName: this.firstName, lastName: this.lastName, email: this.email, mobile: this.mobile, role: this.role, card: this.card, address: this.address, wishlist: this.wishlist, createdAt: this.createdAt, updatedAt: this.updatedAt, isBlocked: this.isBlocked };
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1d" })
}

userSchema.methods.getRefreshToken = function () {
    const user = { id: this._id, firstName: this.firstName, lastName: this.lastName, email: this.email, mobile: this.mobile, role: this.role, card: this.card, address: this.address, wishlist: this.wishlist, createdAt: this.createdAt, updatedAt: this.updatedAt, isBlocked: this.isBlocked };
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "3d" })
};


const User = mongoose.model("User", userSchema);

module.exports = User;