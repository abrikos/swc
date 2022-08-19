const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swticketfiletypes', {
    ticketfiletypeid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    extension: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: ""
    },
    maxsize: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    acceptsupportcenter: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    acceptmailparser: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swticketfiletypes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ticketfiletypeid" },
        ]
      },
      {
        name: "ticketfiletypes1",
        using: "BTREE",
        fields: [
          { name: "extension" },
        ]
      },
    ]
  });
};
