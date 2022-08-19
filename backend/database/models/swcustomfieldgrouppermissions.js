const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swcustomfieldgrouppermissions', {
    customfieldgrouppermissionsid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    typeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    customfieldgroupid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    cfgrouptype: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ""
    },
    accessmask: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'swcustomfieldgrouppermissions',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "customfieldgrouppermissionsid" },
        ]
      },
      {
        name: "customfieldgrouppermissions1",
        using: "BTREE",
        fields: [
          { name: "customfieldgroupid" },
          { name: "cfgrouptype" },
        ]
      },
      {
        name: "customfieldgrouppermissions2",
        using: "BTREE",
        fields: [
          { name: "cfgrouptype" },
          { name: "typeid" },
        ]
      },
    ]
  });
};
