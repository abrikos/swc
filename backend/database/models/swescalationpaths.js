const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swescalationpaths', {
    escalationpathid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ticketid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    slaplanid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    slaplantitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    escalationruleid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    escalationruletitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    ownerstaffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ownerstaffname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
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
    ticketstatusid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ticketstatustitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    priorityid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    prioritytitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    tickettypeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    tickettypetitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    flagtype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swescalationpaths',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "escalationpathid" },
        ]
      },
      {
        name: "escalationpaths1",
        using: "BTREE",
        fields: [
          { name: "ticketid" },
        ]
      },
    ]
  });
};
