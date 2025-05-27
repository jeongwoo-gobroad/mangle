// models/message.js
const Sequelize = require('sequelize');

module.exports = class Message extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      teamPostId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      senderUserId: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'Message',
      tableName: 'messages',
      timestamps: true,
      paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.Message.belongsTo(db.TeamPost, {
      foreignKey: 'teamPostId',
      onDelete: 'CASCADE',
      references: {
        model: 'teamposts', // ✅ 실제 테이블 이름
        key: 'id'
      }
    });
    db.Message.belongsTo(db.User, {
      foreignKey: 'senderUserId',
      targetKey: 'userId',
      onDelete: 'CASCADE',
    });
  }
};
