const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swticketrecipients', {
    ticketrecipientid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ticketid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ticketemailid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    recipienttype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swticketrecipients',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ticketrecipientid" },
        ]
      },
      {
        name: "ticketrecipients1",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ticketid" },
          { name: "ticketemailid" },
        ]
      },
    ]
  });
};
