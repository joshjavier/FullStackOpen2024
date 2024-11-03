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
  date: DataTypes.DATE,
}, {
  underscored: true,
  timestamps: false,
})

module.exports = Note
