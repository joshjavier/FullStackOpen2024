const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/db");

const UserNotes = sequelize.define('user_notes', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  },
  noteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'notes', key: 'id' },
  },
}, {
  underscored: true,
  timestamps: false,
})

module.exports = UserNotes
