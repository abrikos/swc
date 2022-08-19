const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swstaffsettings', {
    staffsettingid: {
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
    departmentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    value: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'swstaffsettings',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "staffsettingid" },
        ]
      },
      {
        name: "staffsettings2",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "staffid" },
          { name: "departmentid" },
          { name: "name" },
        ]
      },
      {
        name: "staffsettings1",
        using: "BTREE",
        fields: [
          { name: "staffid" },
        ]
      },
      {
        name: "staffsettings3",
        using: "BTREE",
        fields: [
          { name: "departmentid" },
        ]
      },
    ]
  });
};
