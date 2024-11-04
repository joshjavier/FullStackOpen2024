const { DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')

const Note = sequelize.define('note', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  important: DataTypes.BOOLEAN,
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  underscored: true,
  timestamps: false,
})

module.exports = Note
