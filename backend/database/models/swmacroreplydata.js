const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swmacroreplydata', {
    macroreplydataid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    macroreplyid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tagcontents: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'swmacroreplydata',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "macroreplydataid" },
        ]
      },
      {
        name: "macroreplydata1",
        using: "BTREE",
        fields: [
          { name: "macroreplyid" },
        ]
      },
    ]
  });
};
