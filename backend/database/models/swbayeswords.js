const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swbayeswords', {
    bayeswordid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    word: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "",
      unique: "bayeswords1"
    }
  }, {
    sequelize,
    tableName: 'swbayeswords',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "bayeswordid" },
        ]
      },
      {
        name: "bayeswords1",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "word" },
        ]
      },
    ]
  });
};
