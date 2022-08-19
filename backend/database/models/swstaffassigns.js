const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swstaffassigns', {
    staffassignid: {
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
    staffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swstaffassigns',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "staffassignid" },
        ]
      },
      {
        name: "staffassigns3",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "departmentid" },
          { name: "staffid" },
        ]
      },
      {
        name: "staffassigns1",
        using: "BTREE",
        fields: [
          { name: "staffid" },
        ]
      },
      {
        name: "staffassigns2",
        using: "BTREE",
        fields: [
          { name: "departmentid" },
        ]
      },
    ]
  });
};
