const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swmacroreplies', {
    macroreplyid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    macrocategoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    staffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    subject: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    totalhits: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    lastusage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    departmentid: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: -1
    },
    ownerstaffid: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: -1
    },
    tickettypeid: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: -1
    },
    ticketstatusid: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: -1
    },
    priorityid: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: -1
    }
  }, {
    sequelize,
    tableName: 'swmacroreplies',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "macroreplyid" },
        ]
      },
      {
        name: "macroreplies1",
        using: "BTREE",
        fields: [
          { name: "macrocategoryid" },
        ]
      },
      {
        name: "macroreplies2",
        using: "BTREE",
        fields: [
          { name: "staffid" },
        ]
      },
      {
        name: "macroreplies3",
        using: "BTREE",
        fields: [
          { name: "subject" },
        ]
      },
    ]
  });
};
