const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swticketfilterfields', {
    ticketfilterfieldid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ticketfilterid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    fieldtitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    fieldoper: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    fieldvalue: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'swticketfilterfields',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ticketfilterfieldid" },
        ]
      },
      {
        name: "ticketfilterfields1",
        using: "BTREE",
        fields: [
          { name: "ticketfilterid" },
        ]
      },
    ]
  });
};
