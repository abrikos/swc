const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swusergroupsettings', {
    ugroupsettingid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    usergroupid: {
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
    tableName: 'swusergroupsettings',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ugroupsettingid" },
        ]
      },
      {
        name: "usergroupsettings2",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "usergroupid" },
          { name: "name" },
        ]
      },
      {
        name: "usergroupsettings1",
        using: "BTREE",
        fields: [
          { name: "usergroupid" },
        ]
      },
    ]
  });
};
