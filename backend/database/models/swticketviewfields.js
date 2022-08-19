const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swticketviewfields', {
    ticketviewfieldid: {
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
    fieldtype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    fieldtypeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swticketviewfields',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ticketviewfieldid" },
        ]
      },
      {
        name: "ticketviewfields1",
        using: "BTREE",
        fields: [
          { name: "ticketviewid" },
        ]
      },
    ]
  });
};
