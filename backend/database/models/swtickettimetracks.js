const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swtickettimetracks', {
    tickettimetrackid: {
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
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    workdateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    creatorstaffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    creatorstaffname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    timespent: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    timebillable: {
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
    workerstaffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    workerstaffname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'swtickettimetracks',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tickettimetrackid" },
        ]
      },
      {
        name: "tickettimetracks1",
        using: "BTREE",
        fields: [
          { name: "ticketid" },
        ]
      },
    ]
  });
};
