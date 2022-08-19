const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swnewssubscribers', {
    newssubscriberid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tgroupid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
      unique: "newssubscribers2"
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isvalidated: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    usergroupid: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swnewssubscribers',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "newssubscriberid" },
        ]
      },
      {
        name: "newssubscribers2",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "newssubscribers1",
        using: "BTREE",
        fields: [
          { name: "tgroupid" },
          { name: "isvalidated" },
        ]
      },
      {
        name: "newssubscribers3",
        using: "BTREE",
        fields: [
          { name: "usergroupid" },
          { name: "isvalidated" },
        ]
      },
      {
        name: "newssubscribers4",
        using: "BTREE",
        fields: [
          { name: "isvalidated" },
        ]
      },
    ]
  });
};
