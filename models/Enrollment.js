const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Enrollment extends Model { }
Enrollment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    grade: {
      type: DataTypes.DECIMAL(4, 1),
      allowNull: false,
      defaultValue: 1
    },
    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'subject',
        key: 'id',
        unique: false
      }
    },
    profesor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'professor',
        key: 'id',
        unique: false
      }
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'student',
        key: 'id',
        unique: false
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'enrollment',
  }
);
module.exports = Enrollment;