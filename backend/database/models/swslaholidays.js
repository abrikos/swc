const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swslaholidays', {
    slaholidayid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    holidayday: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    holidaymonth: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    holidaydate: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: ""
    },
    flagicon: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    iscustom: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swslaholidays',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "slaholidayid" },
        ]
      },
      {
        name: "slaholidays1",
        using: "BTREE",
        fields: [
          { name: "holidayday" },
          { name: "holidaymonth" },
        ]
      },
      {
        name: "slaholidays2",
        using: "BTREE",
        fields: [
          { name: "holidaydate" },
          { name: "iscustom" },
        ]
      },
    ]
  });
};
