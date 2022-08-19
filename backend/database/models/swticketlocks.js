const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swticketlocks', {
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
    tableName: 'swticketlocks',
    timestamps: false,
    indexes: [
      {
        name: "ticketlocks1",
        unique: true,
        using: "HASH",
        fields: [
          { name: "ticketid" },
        ]
      },
    ]
  });
};
