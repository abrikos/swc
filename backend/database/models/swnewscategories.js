const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swnewscategories', {
    newscategoryid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    categorytitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    newsitemcount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    visibilitytype: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ""
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    lastupdate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    titlehash: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'swnewscategories',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "newscategoryid" },
        ]
      },
      {
        name: "newscategories1",
        using: "BTREE",
        fields: [
          { name: "visibilitytype" },
        ]
      },
      {
        name: "newscategories2",
        using: "BTREE",
        fields: [
          { name: "titlehash" },
          { name: "visibilitytype" },
        ]
      },
    ]
  });
};
