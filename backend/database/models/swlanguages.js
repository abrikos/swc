const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swlanguages', {
    languageid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    languagecode: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ""
    },
    charset: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: ""
    },
    author: {
      type: DataTypes.STRING(120),
      allowNull: false,
      defaultValue: ""
    },
    textdirection: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "ltr"
    },
    ismaster: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    isdefault: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    displayorder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isenabled: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    },
    flagicon: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'swlanguages',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "languageid" },
        ]
      },
      {
        name: "languages1",
        using: "BTREE",
        fields: [
          { name: "languagecode" },
        ]
      },
    ]
  });
};
