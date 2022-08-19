const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swusersettings', {
    usersettingid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    value: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swusersettings',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "usersettingid" },
        ]
      },
      {
        name: "usersettings2",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userid" },
          { name: "name" },
        ]
      },
      {
        name: "usersettings1",
        using: "BTREE",
        fields: [
          { name: "userid" },
        ]
      },
    ]
  });
};
