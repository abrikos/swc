const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swslaschedules', {
    slascheduleid: {
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
    sunday_open: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    monday_open: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    tuesday_open: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    wednesday_open: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    thursday_open: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    friday_open: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    saturday_open: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swslaschedules',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "slascheduleid" },
        ]
      },
    ]
  });
};
