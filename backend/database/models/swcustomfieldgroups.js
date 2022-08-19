const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swcustomfieldgroups', {
    customfieldgroupid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: ""
    },
    grouptype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    visibilitytype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    },
    displayorder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swcustomfieldgroups',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "customfieldgroupid" },
        ]
      },
      {
        name: "customfieldgroups1",
        using: "BTREE",
        fields: [
          { name: "grouptype" },
        ]
      },
    ]
  });
};
