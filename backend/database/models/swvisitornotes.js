const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swvisitornotes', {
    visitornoteid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    linktypevalue: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ""
    },
    linktype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    notetype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    lastupdated: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isedited: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    editedstaffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    editedstaffname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    editedtimeline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    notecolor: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    staffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    staffname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'swvisitornotes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "visitornoteid" },
        ]
      },
      {
        name: "visitornotes1",
        using: "BTREE",
        fields: [
          { name: "linktype" },
          { name: "linktypevalue" },
        ]
      },
      {
        name: "visitornotes2",
        using: "BTREE",
        fields: [
          { name: "staffid" },
        ]
      },
    ]
  });
};
