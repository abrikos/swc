const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swnewscategorylinks', {
    newscategorylinkid: {
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
    newscategoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swnewscategorylinks',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "newscategorylinkid" },
        ]
      },
      {
        name: "newscategorylinks1",
        using: "BTREE",
        fields: [
          { name: "newsitemid" },
          { name: "newscategoryid" },
        ]
      },
      {
        name: "newscategorylinks2",
        using: "BTREE",
        fields: [
          { name: "newscategoryid" },
          { name: "newsitemid" },
        ]
      },
    ]
  });
};
