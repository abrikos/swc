const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swlanguagephrases', {
    phraseid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    languageid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    section: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    code: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    sectioncode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    appname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contentsdefault: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ismaster: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    },
    revertrequired: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    modified: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "notmodified"
    }
  }, {
    sequelize,
    tableName: 'swlanguagephrases',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "phraseid" },
        ]
      },
      {
        name: "languagephrases1",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "languageid" },
          { name: "code" },
        ]
      },
      {
        name: "languagephrases2",
        using: "BTREE",
        fields: [
          { name: "modified" },
          { name: "revertrequired" },
        ]
      },
      {
        name: "languagephrases3",
        using: "BTREE",
        fields: [
          { name: "languageid" },
          { name: "modified" },
        ]
      },
      {
        name: "languagephrases4",
        using: "BTREE",
        fields: [
          { name: "appname" },
        ]
      },
    ]
  });
};
