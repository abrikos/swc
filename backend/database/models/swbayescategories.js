const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swbayescategories', {
    bayescategoryid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    category: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    probability: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: false,
      defaultValue: 0
    },
    wordcount: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    categoryweight: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    ismaster: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    categorytype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swbayescategories',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "bayescategoryid" },
        ]
      },
      {
        name: "bayescategories1",
        using: "BTREE",
        fields: [
          { name: "category" },
        ]
      },
    ]
  });
};
