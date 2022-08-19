const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swbayeswordsfreqs', {
    bayeswordid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    bayescategoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    wordcount: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swbayeswordsfreqs',
    timestamps: false,
    indexes: [
      {
        name: "bayeswordsfreqs1",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "bayeswordid" },
          { name: "bayescategoryid" },
        ]
      },
    ]
  });
};
