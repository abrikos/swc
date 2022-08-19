const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swticketfollowups', {
    ticketfollowupid: {
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
    executiondateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ticketid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    staffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    dochangeproperties: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    ownerstaffid: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    departmentid: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    ticketstatusid: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    tickettypeid: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    priorityid: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    dochangeduedateline: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    duedateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    resolutionduedateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    timeworked: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    timebillable: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    donote: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    notetype: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "0"
    },
    notecolor: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    ticketnotes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    doreply: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    replycontents: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    doforward: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    forwardemailto: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    forwardcontents: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'swticketfollowups',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ticketfollowupid" },
        ]
      },
      {
        name: "ticketfollowups1",
        using: "BTREE",
        fields: [
          { name: "ticketid" },
        ]
      },
      {
        name: "ticketfollowups2",
        using: "BTREE",
        fields: [
          { name: "executiondateline" },
        ]
      },
    ]
  });
};
