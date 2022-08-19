const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swticketauditlogs', {
    ticketauditlogid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ticketid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ticketpostid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    departmentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    departmenttitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    creatortype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    creatorid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    creatorfullname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    actiontype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    actionmsg: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    valuetype: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    oldvalueid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    oldvaluestring: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    newvalueid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    newvaluestring: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    actionhash: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'swticketauditlogs',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ticketauditlogid" },
        ]
      },
      {
        name: "ticketauditlogs1",
        using: "BTREE",
        fields: [
          { name: "ticketid" },
          { name: "actiontype" },
        ]
      },
      {
        name: "ticketauditlogs2",
        using: "BTREE",
        fields: [
          { name: "dateline" },
          { name: "creatortype" },
          { name: "creatorid" },
        ]
      },
      {
        name: "ticketauditlogs3",
        using: "BTREE",
        fields: [
          { name: "actionhash" },
        ]
      },
      {
        name: "ticketauditlogs4",
        using: "BTREE",
        fields: [
          { name: "ticketid" },
          { name: "ticketpostid" },
          { name: "valuetype" },
        ]
      },
      {
        name: "ticketauditlogs5",
        using: "BTREE",
        fields: [
          { name: "ticketpostid" },
          { name: "ticketid" },
          { name: "valuetype" },
        ]
      },
    ]
  });
};
