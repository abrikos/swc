const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swapplogdata', {
    applogdataid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    applogid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    logdata: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'swapplogdata',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "applogdataid" },
        ]
      },
      {
        name: "applogdata1",
        using: "BTREE",
        fields: [
          { name: "applogid" },
        ]
      },
    ]
  });
};
