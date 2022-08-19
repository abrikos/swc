const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swcalls', {
    callid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    phonenumber: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    callguid: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    userfullname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    useremail: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    staffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    stafffullname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    chatobjectid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    departmentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    enddateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    lastactivity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isclicktocall: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    callstatus: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    calltype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    fileid: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swcalls',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "callid" },
        ]
      },
      {
        name: "calls1",
        using: "BTREE",
        fields: [
          { name: "phonenumber" },
          { name: "userid" },
        ]
      },
      {
        name: "calls2",
        using: "BTREE",
        fields: [
          { name: "userid" },
        ]
      },
      {
        name: "calls3",
        using: "BTREE",
        fields: [
          { name: "staffid" },
        ]
      },
      {
        name: "calls4",
        using: "BTREE",
        fields: [
          { name: "dateline" },
        ]
      },
      {
        name: "calls5",
        using: "BTREE",
        fields: [
          { name: "callstatus" },
        ]
      },
      {
        name: "calls6",
        using: "BTREE",
        fields: [
          { name: "departmentid" },
        ]
      },
      {
        name: "calls7",
        using: "BTREE",
        fields: [
          { name: "chatobjectid" },
        ]
      },
      {
        name: "calls8",
        using: "BTREE",
        fields: [
          { name: "callguid" },
        ]
      },
      {
        name: "calls9",
        using: "BTREE",
        fields: [
          { name: "calltype" },
          { name: "callstatus" },
        ]
      },
      {
        name: "calls10",
        using: "BTREE",
        fields: [
          { name: "phonenumber", length: 15 },
          { name: "userfullname", length: 30 },
          { name: "useremail", length: 40 },
        ]
      },
    ]
  });
};
