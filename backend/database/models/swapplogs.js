const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swapplogs', {
    applogid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    appname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    logtype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swapplogs',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "applogid" },
        ]
      },
      {
        name: "applogs1",
        using: "BTREE",
        fields: [
          { name: "appname" },
          { name: "logtype" },
        ]
      },
      {
        name: "applogs2",
        using: "BTREE",
        fields: [
          { name: "logtype" },
        ]
      },
    ]
  });
};
