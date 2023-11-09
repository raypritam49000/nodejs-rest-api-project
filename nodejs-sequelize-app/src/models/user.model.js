const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define('user', {
  user_id: { type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true },
  name: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false },
  myDate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
})

sequelize.sync({ force: false });

module.exports = User;