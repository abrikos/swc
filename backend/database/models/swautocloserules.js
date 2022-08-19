const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swautocloserules', {
    autocloseruleid: {
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
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    targetticketstatusid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    inactivitythreshold: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    closurethreshold: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    sendpendingnotification: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    sendfinalnotification: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isenabled: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    sortorder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    suppresssurveyemail: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swautocloserules',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "autocloseruleid" },
        ]
      },
      {
        name: "autocloserules1",
        using: "BTREE",
        fields: [
          { name: "isenabled" },
          { name: "sortorder" },
        ]
      },
      {
        name: "autocloserules2",
        using: "BTREE",
        fields: [
          { name: "title" },
        ]
      },
    ]
  });
};
