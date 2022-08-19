const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swgroupassigns', {
    groupassignid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    departmentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    staffgroupid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swgroupassigns',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "groupassignid" },
        ]
      },
      {
        name: "groupassigns3",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "departmentid" },
          { name: "staffgroupid" },
        ]
      },
      {
        name: "groupassigns1",
        using: "BTREE",
        fields: [
          { name: "staffgroupid" },
        ]
      },
      {
        name: "groupassigns2",
        using: "BTREE",
        fields: [
          { name: "departmentid" },
        ]
      },
    ]
  });
};
