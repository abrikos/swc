const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swnewsitemdata', {
    newsitemdataid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    newsitemid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'swnewsitemdata',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "newsitemdataid" },
        ]
      },
      {
        name: "newsitemdata1",
        using: "BTREE",
        fields: [
          { name: "newsitemid" },
        ]
      },
    ]
  });
};
