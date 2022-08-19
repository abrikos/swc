const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swtroubleshootercategories', {
    troubleshootercategoryid: {
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
    staffname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    categorytype: {
      type: DataTypes.SMALLINT,
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
    uservisibilitycustom: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    staffvisibilitycustom: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swtroubleshootercategories',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "troubleshootercategoryid" },
        ]
      },
      {
        name: "troubleshootercategories1",
        using: "BTREE",
        fields: [
          { name: "categorytype" },
        ]
      },
      {
        name: "troubleshootercategories2",
        using: "BTREE",
        fields: [
          { name: "staffvisibilitycustom" },
          { name: "troubleshootercategoryid" },
        ]
      },
      {
        name: "troubleshootercategories3",
        using: "BTREE",
        fields: [
          { name: "title" },
        ]
      },
    ]
  });
};
