const { DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

const Team = sequelize.define('team', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
}, {
  underscored: true,
  timestamps: false,
})

module.exports = Team
