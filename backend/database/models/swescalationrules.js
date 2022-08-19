const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swescalationrules', {
    escalationruleid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    slaplanid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    staffid: {
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
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ruletype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    flagtype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    newslaplanid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    addtags: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    removetags: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tickettypeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swescalationrules',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "escalationruleid" },
        ]
      },
      {
        name: "escalationrules1",
        using: "BTREE",
        fields: [
          { name: "slaplanid" },
        ]
      },
      {
        name: "escalationrules2",
        using: "BTREE",
        fields: [
          { name: "title" },
        ]
      },
    ]
  });
};
