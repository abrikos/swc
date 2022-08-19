const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swticketviewlinks', {
    ticketviewlinkid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ticketviewid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    linktype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    linktypeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swticketviewlinks',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ticketviewlinkid" },
        ]
      },
      {
        name: "ticketviewlinks1",
        using: "BTREE",
        fields: [
          { name: "ticketviewid" },
        ]
      },
    ]
  });
};
