const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swwidgets', {
    widgetid: {
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
    defaulttitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    appname: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: ""
    },
    widgetlink: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    defaulticon: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    defaultsmallicon: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    displayorder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    displayinnavbar: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    displayinindex: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    ismaster: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    isenabled: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    widgetvisibility: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    uservisibilitycustom: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    widgetname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    staffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swwidgets',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "widgetid" },
        ]
      },
      {
        name: "widgets1",
        using: "BTREE",
        fields: [
          { name: "appname" },
        ]
      },
      {
        name: "widgets2",
        using: "BTREE",
        fields: [
          { name: "isenabled" },
        ]
      },
    ]
  });
};
