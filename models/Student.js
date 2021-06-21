const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');
class Student extends Model {}
Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
  },
  },
  {
    //Add la parte de hooks a 
    hooks: {
      beforeCreate: async (newStudentData) => {
        newStudentData.password = await bcrypt.hash(newStudentData.password, 10);
        return newStudentData;
      },
      beforeUpdate: async (updatedStudentData) => {
        updatedStudentData.password = await bcrypt.hash(updatedStudentData.password, 10);
        return updatedStudentData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'student',
  }
);
module.exports = Student;