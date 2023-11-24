const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate({ User, Post }) {
      this.belongsTo(User, { foreignKey: 'userIdComment' });
      this.belongsTo(Post, { foreignKey: 'postIdComment' });
    }
  }
  Comment.init({

    postIdComment: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Posts',
      },
    },
    userIdComment: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
      },
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
