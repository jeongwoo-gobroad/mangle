const Sequelize = require('sequelize');

class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      userId: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(255), // bcrypt 해시 길이 고려
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      school: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      grade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      major: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      interests: {
        type: Sequelize.TEXT, // JSON string으로 저장
        allowNull: true,
        get() {
          const raw = this.getDataValue('interests');
          return raw ? JSON.parse(raw) : [];
        },
        set(value) {
          this.setDataValue('interests', JSON.stringify(value));
        },
      },
      role: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: '백엔드 개발자', // 기본 직군
      },
    }, {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
      paranoid: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    // 여기에 추후 Post 등 연결 가능
  }
  
};
module.exports = User;