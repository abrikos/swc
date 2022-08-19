const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swusergroups', {
    usergroupid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    grouptype: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ismaster: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swusergroups',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "usergroupid" },
        ]
      },
      {
        name: "usergroups1",
        using: "BTREE",
        fields: [
          { name: "grouptype" },
        ]
      },
      {
        name: "usergroups2",
        using: "BTREE",
        fields: [
          { name: "title" },
          { name: "grouptype" },
        ]
      },
    ]
  });
};
