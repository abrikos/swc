const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swstaffgrouplinks', {
    staffgrouplinkid: {
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
    staffgroupid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swstaffgrouplinks',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "staffgrouplinkid" },
        ]
      },
      {
        name: "staffgrouplinks1",
        using: "BTREE",
        fields: [
          { name: "staffgroupid" },
          { name: "type" },
        ]
      },
      {
        name: "staffgrouplinks2",
        using: "BTREE",
        fields: [
          { name: "toassignid" },
          { name: "type" },
          { name: "staffgroupid" },
        ]
      },
    ]
  });
};
