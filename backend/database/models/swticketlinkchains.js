const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swticketlinkchains', {
    ticketlinkchainid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ticketid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ticketlinktypeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    chainhash: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'swticketlinkchains',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ticketlinkchainid" },
        ]
      },
      {
        name: "ticketlinkchains1",
        using: "BTREE",
        fields: [
          { name: "chainhash" },
        ]
      },
      {
        name: "ticketlinkchains2",
        using: "BTREE",
        fields: [
          { name: "ticketid" },
        ]
      },
      {
        name: "ticketlinkchains3",
        using: "BTREE",
        fields: [
          { name: "ticketlinktypeid" },
        ]
      },
    ]
  });
};
