const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swcustomfields', {
    customfieldid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    customfieldgroupid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    fieldtype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    fieldname: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    defaultvalue: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    isrequired: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    usereditable: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    staffeditable: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    regexpvalidate: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    displayorder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    encryptindb: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'swcustomfields',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "customfieldid" },
        ]
      },
      {
        name: "customfields1",
        using: "BTREE",
        fields: [
          { name: "customfieldgroupid" },
        ]
      },
    ]
  });
};
