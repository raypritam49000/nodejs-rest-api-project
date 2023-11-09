const mongoose = require('mongoose');

exports.connectBD = () => {
    mongoose.set('debug', true);
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.DB_URL).then(() => {
        console.log("Database are connected..");
    }).catch((error) => {
        console.log("Error occoure when database are connected..", error);
    })
}