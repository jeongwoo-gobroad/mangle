const Sequelize = require('sequelize');

module.exports = class TeamPost extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      contestTitle: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      authorUserId: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      desiredRoles: {
        type: Sequelize.TEXT, // 예: ["프론트엔드", "디자이너"]
        allowNull: false,
        get() {
          const raw = this.getDataValue('desiredRoles');
          return raw ? JSON.parse(raw) : [];
        },
        set(value) {
          this.setDataValue('desiredRoles', JSON.stringify(value));
        }
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      hashtags: {
        type: Sequelize.TEXT,
        allowNull: true,
        get() {
          const raw = this.getDataValue('hashtags');
          return raw ? JSON.parse(raw) : [];
        },
        set(value) {
          this.setDataValue('hashtags', JSON.stringify(value));
        }
      }
    }, {
      sequelize,
      modelName: 'TeamPost',
      tableName: 'teamposts',
      timestamps: true,
      paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    db.TeamPost.belongsTo(db.User, {
    foreignKey: 'authorUserId',
    targetKey: 'userId',
    constraints: false, // 🔥 이 줄을 추가하면 FK 제약 조건 안 만듦
  });
  }
};