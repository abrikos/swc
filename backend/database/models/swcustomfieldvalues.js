const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swcustomfieldvalues', {
    customfieldvalueid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    customfieldid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    typeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    fieldvalue: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isserialized: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    isencrypted: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    uniquehash: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    lastupdated: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swcustomfieldvalues',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "customfieldvalueid" },
        ]
      },
      {
        name: "customfieldvalues1",
        using: "BTREE",
        fields: [
          { name: "customfieldid" },
          { name: "typeid" },
        ]
      },
      {
        name: "customfieldvalues2",
        using: "BTREE",
        fields: [
          { name: "uniquehash" },
        ]
      },
    ]
  });
};
