const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swvisitorruleactions', {
    visitorruleactionid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    visitorruleid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    actiontype: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    actionname: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    actionvalue: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'swvisitorruleactions',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "visitorruleactionid" },
        ]
      },
      {
        name: "visitorruleactions1",
        using: "BTREE",
        fields: [
          { name: "visitorruleid" },
        ]
      },
    ]
  });
};
