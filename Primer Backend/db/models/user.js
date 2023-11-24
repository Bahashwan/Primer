const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Animal, Like, Comment }) {
      this.hasMany(Animal, { foreignKey: 'userId' });
      this.hasMany(Like, { foreignKey: 'userIdLike' });
      this.hasMany(Comment, { foreignKey: 'userIdComment' });
    }
  }
  User.init({
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    city: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
