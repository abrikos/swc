const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swticketrecurrences', {
    ticketrecurrenceid: {
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
    tickettype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    departmentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ownerstaffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    tickettypeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ticketstatusid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ticketpriorityid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    staffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    dontsendemail: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    dispatchautoresponder: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    intervaltype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    intervalstep: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    daily_everyweekday: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    weekly_monday: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    weekly_tuesday: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    weekly_wednesday: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    weekly_thursday: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    weekly_friday: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    weekly_saturday: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    weekly_sunday: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    monthly_type: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    monthly_day: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    monthly_extdaystep: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "0"
    },
    monthly_extday: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "0"
    },
    yearly_type: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    yearly_month: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    yearly_monthday: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    yearly_extdaystep: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "0"
    },
    yearly_extday: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "0"
    },
    yearly_extmonth: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    startdateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    endtype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    enddateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    endcount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    creationcount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    nextrecurrence: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swticketrecurrences',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ticketrecurrenceid" },
        ]
      },
      {
        name: "ticketrecurrences1",
        using: "BTREE",
        fields: [
          { name: "nextrecurrence" },
          { name: "startdateline" },
        ]
      },
      {
        name: "ticketrecurrences2",
        using: "BTREE",
        fields: [
          { name: "ticketid" },
        ]
      },
    ]
  });
};
