const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swnotificationactions', {
    notificationactionid: {
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
    actiontype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    contents: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'swnotificationactions',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "notificationactionid" },
        ]
      },
      {
        name: "notificationactions1",
        using: "BTREE",
        fields: [
          { name: "notificationruleid" },
        ]
      },
    ]
  });
};
