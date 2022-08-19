const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swreporthistory', {
    reporthistoryid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    reportid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    creatorstaffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    creatorstaffname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    kql: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'swreporthistory',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "reporthistoryid" },
        ]
      },
      {
        name: "reporthistory1",
        using: "BTREE",
        fields: [
          { name: "reportid" },
        ]
      },
    ]
  });
};
