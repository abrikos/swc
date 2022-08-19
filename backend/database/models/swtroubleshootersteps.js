const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swtroubleshootersteps', {
    troubleshooterstepid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    troubleshootercategoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    stepstatus: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    staffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    staffname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    subject: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    edited: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    editedstaffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    editedstaffname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    editeddateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    displayorder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    allowcomments: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    hasattachments: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    redirecttickets: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    ticketsubject: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    redirectdepartmentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
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
    }
  }, {
    sequelize,
    tableName: 'swtroubleshootersteps',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "troubleshooterstepid" },
        ]
      },
      {
        name: "troubleshootersteps1",
        using: "BTREE",
        fields: [
          { name: "troubleshootercategoryid" },
        ]
      },
    ]
  });
};
