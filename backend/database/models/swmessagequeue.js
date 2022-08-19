const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swmessagequeue', {
    messagequeueid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    chatobjectid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    chatchildid: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: ""
    },
    staffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      defaultValue: ""
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    msgtype: {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: ""
    },
    guid: {
      type: DataTypes.STRING(150),
      allowNull: false,
      defaultValue: ""
    },
    submittype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swmessagequeue',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "messagequeueid" },
        ]
      },
      {
        name: "messagequeue1",
        using: "BTREE",
        fields: [
          { name: "chatobjectid" },
          { name: "chatchildid" },
        ]
      },
      {
        name: "messagequeue2",
        using: "BTREE",
        fields: [
          { name: "dateline" },
        ]
      },
      {
        name: "messagequeue3",
        using: "BTREE",
        fields: [
          { name: "chatobjectid" },
          { name: "staffid" },
        ]
      },
      {
        name: "messagequeue4",
        using: "BTREE",
        fields: [
          { name: "guid" },
        ]
      },
    ]
  });
};
