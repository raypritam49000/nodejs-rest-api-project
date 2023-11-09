const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    "employee_management_system",
    "root",
    "0003pray",
    {
        dialect: "mysql",
        host: "localhost"
    },
    {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
);

module.exports = sequelize;