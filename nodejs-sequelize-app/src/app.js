const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const userRouter = require("./routes/user.routes.js")
const logger = require('morgan');

app.use(cors({ origin: "*" }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users',userRouter)

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Nodejs With Sequelize application." });
});


app.listen(PORT, HOST, () => {
    console.log(`Server is running on port ${HOST}:${PORT}.`);
});