const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const logger = require('morgan');
const authRoutes = require('./routes/authRoutes.js');
const howdyRoutes = require('./routes/howdyRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const { connectBD } = require("./config/dbConnection.js");

connectBD();
app.use(cors({ origin: "*" }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth',authRoutes);
app.use('/howdy',howdyRoutes);
app.use('/api/users',userRoutes);


// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Nodejs With Sequelize application." });
});


app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});