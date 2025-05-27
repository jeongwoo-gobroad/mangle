const Sequelize = require('sequelize');

class Contest extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      tags: {
        type: Sequelize.TEXT,
        allowNull: true,
        get() {
          const raw = this.getDataValue('tags');
          return raw ? JSON.parse(raw) : [];
        },
        set(value) {
          this.setDataValue('tags', JSON.stringify(value));
        },
      },
      requiredRoles: {
        type: Sequelize.TEXT,
        allowNull: true,
        get() {
          const raw = this.getDataValue('requiredRoles');
          return raw ? JSON.parse(raw) : [];
        },
        set(value) {
          this.setDataValue('requiredRoles', JSON.stringify(value));
        }
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      
    }, {
      sequelize,
      modelName: 'Contest',
      tableName: 'contests',
      timestamps: true,
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) {
    // 추후 관계 설정 시 여기에 작성
  }
}

module.exports = Contest;
