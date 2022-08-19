const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swtickettimetracknotes', {
    tickettimetracknoteid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tickettimetrackid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'swtickettimetracknotes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tickettimetracknoteid" },
        ]
      },
      {
        name: "tickettimetracknotes1",
        using: "BTREE",
        fields: [
          { name: "tickettimetrackid" },
        ]
      },
    ]
  });
};
