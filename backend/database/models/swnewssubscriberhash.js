const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swnewssubscriberhash', {
    newssubscriberhashid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    newssubscriberid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    hash: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ""
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swnewssubscriberhash',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "newssubscriberhashid" },
        ]
      },
      {
        name: "newssubscriberhash1",
        using: "BTREE",
        fields: [
          { name: "newssubscriberid" },
        ]
      },
      {
        name: "newssubscriberhash2",
        using: "BTREE",
        fields: [
          { name: "hash" },
        ]
      },
    ]
  });
};
