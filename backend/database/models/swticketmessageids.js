const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swticketmessageids', {
    ticketmessageid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    messageid: {
      type: DataTypes.STRING(17),
      allowNull: false,
      defaultValue: ""
    },
    ticketid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ticketpostid: {
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
    tableName: 'swticketmessageids',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ticketmessageid" },
        ]
      },
      {
        name: "ticketmessageids1",
        using: "BTREE",
        fields: [
          { name: "messageid" },
          { name: "ticketid" },
        ]
      },
      {
        name: "ticketmessageids2",
        using: "BTREE",
        fields: [
          { name: "dateline" },
        ]
      },
      {
        name: "ticketmessageids3",
        using: "BTREE",
        fields: [
          { name: "ticketid" },
          { name: "messageid" },
        ]
      },
    ]
  });
};
