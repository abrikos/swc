const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swslaholidaylinks', {
    slaholidaylinkid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    slaplanid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    slaholidayid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swslaholidaylinks',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "slaholidaylinkid" },
        ]
      },
      {
        name: "slaholidaylinks1",
        using: "BTREE",
        fields: [
          { name: "slaplanid" },
          { name: "slaholidayid" },
        ]
      },
      {
        name: "slaholidaylinks2",
        using: "BTREE",
        fields: [
          { name: "slaholidayid" },
        ]
      },
    ]
  });
};
