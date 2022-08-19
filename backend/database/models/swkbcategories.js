const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swkbcategories', {
    kbcategoryid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    parentkbcategoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    staffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    totalarticles: {
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
    articlesortorder: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    allowcomments: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    allowrating: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    ispublished: {
      type: DataTypes.SMALLINT,
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
    },
    isimporteddownloadcategory: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swkbcategories',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "kbcategoryid" },
        ]
      },
      {
        name: "kbcategories1",
        using: "BTREE",
        fields: [
          { name: "parentkbcategoryid" },
        ]
      },
      {
        name: "kbcategories2",
        using: "BTREE",
        fields: [
          { name: "categorytype" },
          { name: "parentkbcategoryid" },
          { name: "uservisibilitycustom" },
          { name: "staffvisibilitycustom" },
        ]
      },
      {
        name: "kbcategories3",
        using: "BTREE",
        fields: [
          { name: "uservisibilitycustom" },
          { name: "categorytype" },
        ]
      },
      {
        name: "kbcategories4",
        using: "BTREE",
        fields: [
          { name: "title" },
          { name: "kbcategoryid" },
        ]
      },
    ]
  });
};
