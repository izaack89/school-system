const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Professor extends Model {}
Professor.init(
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
      beforeCreate: async (newProfessorData) => {
        newProfessorData.password = await bcrypt.hash(newProfessorData.password, 10);
        return newProfessorData;
      },
      beforeUpdate: async (updatedProfessorData) => {
        updatedProfessorData.password = await bcrypt.hash(updatedProfessorData.password, 10);
        return updatedProfessorData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'professor',
  }
);
module.exports = Professor;