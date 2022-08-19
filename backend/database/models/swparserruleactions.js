const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swparserruleactions', {
    parserruleactionid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    parserruleid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    typeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    typedata: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    typechar: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'swparserruleactions',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "parserruleactionid" },
        ]
      },
      {
        name: "parserruleactions1",
        using: "BTREE",
        fields: [
          { name: "parserruleid" },
        ]
      },
    ]
  });
};
