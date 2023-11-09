const User = require('../models/user.model.js');

// Retrieve all User from the database.
exports.findAll = async (req, res) => {
    try {
        const userList = await User.findAll();
        res.status(200).json({ mesage: "User List", "data": userList, "success": true });
    } catch (error) {
        res.status(500).json({ message: error.message, success: false });
    }
};


// Create and Save a new Tutorial
exports.create = async (req, res) => {

    try {
        const user = req.body;
        // Validate request
        if (!user) {
            res.status(400).send({ message: "Content can not be empty!", success: false });
            return;
        }
        // Save Tutorial in the database
        const savedUser = await User.create(user)
        res.status(200).send({ message: "User Saved", success: true, "data": savedUser });

    } catch (error) {
        res.status(500).send({ message: error.message, success: false });
    }
};

exports.findById = async (req, res) => {
    try {

        const user = await User.findByPk(req.params.id);
        console.log(user.toJSON());

        if (!user) {
            res.status(400).send({ message: "Data Not Found", success: false });
            return;
        }

        res.status(200).json({ mesage: "User List", "data": user, "success": true });

    } catch (error) {
        res.status(500).send({ message: error.message, success: false });
    }
}

exports.updateById = async (req, res) => {
    try {
        const id = req.params.id;

        let user = await User.findByPk(id);
        console.log(user.toJSON());

        const { name, email, myDate, createdAt, updatedAt } = req.body;

        if (!name || !email || !myDate || !createdAt || !updatedAt) {
            res.status(400).send({ message: "all field must be required", success: false });
        }

        user.name = name;
        user.email = email;
        user.createdAt = createdAt;
        user.updatedAt = updatedAt;
        user.myDate = myDate;

        await user.save();

        res.status(201).send({ message: "Updated User", success: true, data: user });

    } catch (error) {
        res.status(500).send({ message: error.message, success: false });
    }
}

exports.deleteById = async (req, res) => {
    try {
        const id = req.params.id;
        const isDeleted = await User.destroy({ where: { user_id: id } });

        if (isDeleted == 1) {
            res.status(200).json({ message: "User was deleted successfully!", success: true });
        }
        else {
            res.status(400).json({ message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`, success: false });
        }

    } catch (error) {
        res.status(500).send({ message: error.message, success: false });
    }
}