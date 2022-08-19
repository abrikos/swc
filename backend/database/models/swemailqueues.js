const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swemailqueues', {
    emailqueueid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    type: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: "tickets"
    },
    fetchtype: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: "pipe"
    },
    host: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    port: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: ""
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    userpassword: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    customfromname: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: ""
    },
    customfromemail: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    tickettypeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    priorityid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ticketstatusid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    departmentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    prefix: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: ""
    },
    ticketautoresponder: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    replyautoresponder: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    registrationrequired: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    tgroupid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    forcequeue: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    },
    leavecopyonserver: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    usequeuesmtp: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    smtptype: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ""
    },
    isenabled: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swemailqueues',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "emailqueueid" },
        ]
      },
      {
        name: "emailqueues1",
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "emailqueues2",
        using: "BTREE",
        fields: [
          { name: "email", length: 100 },
          { name: "customfromname", length: 100 },
          { name: "customfromemail", length: 100 },
        ]
      },
    ]
  });
};
