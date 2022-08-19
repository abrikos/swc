const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swreportschedules', {
    scheduleid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    staffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    reportid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isexecuted: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    lastrun: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    nextrun: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    cday: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    format: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "Excel"
    },
    recurrencetype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    ccemails: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'swreportschedules',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "scheduleid" },
        ]
      },
      {
        name: "reportschedules1",
        using: "BTREE",
        fields: [
          { name: "staffid" },
        ]
      },
      {
        name: "reportschedules2",
        using: "BTREE",
        fields: [
          { name: "reportid" },
        ]
      },
    ]
  });
};
