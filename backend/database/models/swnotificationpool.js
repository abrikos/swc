const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swnotificationpool', {
    notificationpoolid: {
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
    staffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swnotificationpool',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "notificationpoolid" },
        ]
      },
      {
        name: "notificationpool1",
        using: "BTREE",
        fields: [
          { name: "staffid" },
          { name: "dateline" },
        ]
      },
      {
        name: "notificationpool2",
        using: "BTREE",
        fields: [
          { name: "dateline" },
        ]
      },
    ]
  });
};
