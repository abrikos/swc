const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swstaffproperties', {
    staffpropertyid: {
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
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    updatedateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    keyname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    keyvalue: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'swstaffproperties',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "staffpropertyid" },
        ]
      },
      {
        name: "staffproperties1",
        using: "BTREE",
        fields: [
          { name: "staffid" },
          { name: "keyname" },
        ]
      },
    ]
  });
};
