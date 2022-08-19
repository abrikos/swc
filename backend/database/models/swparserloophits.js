const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swparserloophits', {
    parserloophitid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    emailaddress: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'swparserloophits',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "parserloophitid" },
        ]
      },
      {
        name: "parserloophits1",
        using: "BTREE",
        fields: [
          { name: "dateline" },
        ]
      },
      {
        name: "parserloophits2",
        using: "BTREE",
        fields: [
          { name: "emailaddress" },
        ]
      },
    ]
  });
};
