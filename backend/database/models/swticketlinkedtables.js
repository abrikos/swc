const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swticketlinkedtables', {
    ticketlinkedtableid: {
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
    linktype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    linktypeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ticketid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swticketlinkedtables',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ticketlinkedtableid" },
        ]
      },
      {
        name: "ticketlinkedtables1",
        using: "BTREE",
        fields: [
          { name: "ticketid" },
          { name: "linktype" },
        ]
      },
      {
        name: "ticketlinkedtables2",
        using: "BTREE",
        fields: [
          { name: "linktype" },
          { name: "linktypeid" },
        ]
      },
    ]
  });
};
