const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swstaffgroupsettings', {
    sgroupsettingid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    staffgroupid: {
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
    tableName: 'swstaffgroupsettings',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "sgroupsettingid" },
        ]
      },
      {
        name: "staffgroupsettings2",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "staffgroupid" },
          { name: "name" },
        ]
      },
      {
        name: "staffgroupsettings1",
        using: "BTREE",
        fields: [
          { name: "staffgroupid" },
        ]
      },
    ]
  });
};
