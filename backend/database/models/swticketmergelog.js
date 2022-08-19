const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swticketmergelog', {
    ticketmergelogid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    oldticketid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    oldticketmaskid: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ""
    },
    ticketid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    staffid: {
      type: DataTypes.INTEGER,
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
    tableName: 'swticketmergelog',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ticketmergelogid" },
        ]
      },
      {
        name: "ticketmergelog1",
        using: "BTREE",
        fields: [
          { name: "oldticketid" },
        ]
      },
      {
        name: "ticketmergelog2",
        using: "BTREE",
        fields: [
          { name: "oldticketmaskid" },
        ]
      },
      {
        name: "ticketmergelog3",
        using: "BTREE",
        fields: [
          { name: "ticketid" },
        ]
      },
    ]
  });
};
