const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

const Membership = sequelize.define('membership', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  },
  teamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'teams', key: 'id' },
  },
}, {
  underscored: true,
  timestamps: false,
})

module.exports = Membership
