const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swparserlogs', {
    parserlogid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    typeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    emailqueueid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    logtype: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "failure"
    },
    subject: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    fromemail: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    toemail: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    parsetimetaken: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    responsetype: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "ticket"
    },
    ticketpostid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ticketmaskid: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ""
    },
    messageid: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'swparserlogs',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "parserlogid" },
        ]
      },
      {
        name: "parserlogs1",
        using: "BTREE",
        fields: [
          { name: "ticketpostid" },
        ]
      },
      {
        name: "parserlogs2",
        using: "BTREE",
        fields: [
          { name: "dateline" },
        ]
      },
      {
        name: "parserlogs3",
        using: "BTREE",
        fields: [
          { name: "emailqueueid" },
        ]
      },
      {
        name: "parserlogs4",
        using: "BTREE",
        fields: [
          { name: "logtype" },
          { name: "dateline" },
        ]
      },
    ]
  });
};
