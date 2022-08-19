const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swnotificationcriteria', {
    notificationcriteriaid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    notificationruleid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: ""
    },
    ruleop: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    rulematch: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    rulematchtype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swnotificationcriteria',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "notificationcriteriaid" },
        ]
      },
      {
        name: "notificationcriteria1",
        using: "BTREE",
        fields: [
          { name: "notificationruleid" },
        ]
      },
    ]
  });
};
