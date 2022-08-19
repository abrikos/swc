const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swreports', {
    reportid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    reportcategoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    basetablename: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    basetablenametext: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    creatorstaffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    creatorstaffname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    visibilitytype: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "public"
    },
    updatedateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    updatestaffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    updatestaffname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    executedateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    executestaffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    executestaffname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    executetimetaken: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    chartsenabled: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    },
    kql: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'swreports',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "reportid" },
        ]
      },
      {
        name: "reports1",
        using: "BTREE",
        fields: [
          { name: "dateline" },
        ]
      },
      {
        name: "reports2",
        using: "BTREE",
        fields: [
          { name: "title" },
        ]
      },
    ]
  });
};
