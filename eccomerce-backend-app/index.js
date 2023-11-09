const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

require('../eccomerce-backend-app/config/dbconnect');

const authRoute = require('../eccomerce-backend-app/routes/authRoute');
const userRoute = require('../eccomerce-backend-app/routes/userRoutes');

const { notFound, errorHandler } = require('./middlewares/errorHandler');

app.use(morgan('dev'));
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/api/auth', authRoute);
app.use('/api/user/',userRoute);

app.use(notFound);
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send("Hello Pritam Ray");
});

app.listen(PORT, HOST, () => {
    console.log(`Server are running at http://${HOST}:${PORT}`);
});

