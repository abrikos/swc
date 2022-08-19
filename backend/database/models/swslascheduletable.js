const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swslascheduletable', {
    slascheduletableid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    slascheduleid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    sladay: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    opentimeline: {
      type: DataTypes.STRING(6),
      allowNull: false,
      defaultValue: "00:00"
    },
    closetimeline: {
      type: DataTypes.STRING(6),
      allowNull: false,
      defaultValue: "00:00"
    }
  }, {
    sequelize,
    tableName: 'swslascheduletable',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "slascheduletableid" },
        ]
      },
    ]
  });
};
