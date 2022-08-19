const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swusergroupassigns', {
    usergroupassignid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    toassignid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    type: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    usergroupid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swusergroupassigns',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "usergroupassignid" },
        ]
      },
      {
        name: "usergroupassigns1",
        using: "BTREE",
        fields: [
          { name: "usergroupid" },
          { name: "type" },
        ]
      },
      {
        name: "usergroupassigns2",
        using: "BTREE",
        fields: [
          { name: "toassignid" },
          { name: "type" },
          { name: "usergroupid" },
        ]
      },
    ]
  });
};
