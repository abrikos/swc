const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swvisitorbans', {
    visitorbanid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ipaddress: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "0.0.0.0",
      unique: "visitorbans3"
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    staffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isregex: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swvisitorbans',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "visitorbanid" },
        ]
      },
      {
        name: "visitorbans3",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ipaddress" },
        ]
      },
      {
        name: "visitorbans2",
        using: "BTREE",
        fields: [
          { name: "staffid" },
        ]
      },
      {
        name: "visitorbans4",
        using: "BTREE",
        fields: [
          { name: "isregex" },
        ]
      },
    ]
  });
};
