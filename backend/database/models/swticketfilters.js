const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swticketfilters', {
    ticketfilterid: {
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
    lastactivity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    filtertype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    staffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    restrictstaffgroupid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    criteriaoptions: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swticketfilters',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ticketfilterid" },
        ]
      },
      {
        name: "ticketfilters1",
        using: "BTREE",
        fields: [
          { name: "filtertype" },
          { name: "staffid" },
        ]
      },
      {
        name: "ticketfilters2",
        using: "BTREE",
        fields: [
          { name: "filtertype" },
          { name: "restrictstaffgroupid" },
        ]
      },
      {
        name: "ticketfilters3",
        using: "BTREE",
        fields: [
          { name: "staffid" },
        ]
      },
      {
        name: "ticketfilters4",
        using: "BTREE",
        fields: [
          { name: "title" },
          { name: "ticketfilterid" },
        ]
      },
    ]
  });
};
