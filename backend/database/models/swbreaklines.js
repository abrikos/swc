const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swbreaklines', {
    breaklineid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    breakline: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "0"
    },
    isregexp: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    sortorder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swbreaklines',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "breaklineid" },
        ]
      },
      {
        name: "breaklines1",
        using: "BTREE",
        fields: [
          { name: "breakline" },
        ]
      },
    ]
  });
};
