const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swparserloopblocks', {
    parserloopblockid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    restoretime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'swparserloopblocks',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "parserloopblockid" },
        ]
      },
      {
        name: "parserloopblocks1",
        using: "BTREE",
        fields: [
          { name: "address" },
          { name: "restoretime" },
        ]
      },
      {
        name: "parserloopblocks2",
        using: "BTREE",
        fields: [
          { name: "restoretime" },
        ]
      },
    ]
  });
};
