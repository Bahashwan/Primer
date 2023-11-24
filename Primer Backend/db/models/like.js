const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate({ User, Post }) {
      this.belongsTo(User, { foreignKey: 'userIdLike' });
      this.belongsTo(Post, { foreignKey: 'postIdLike' });
    }
  }
  Like.init({
    postIdLike: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Posts',
      },
    },
    userIdLike: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
      },
    },
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};
