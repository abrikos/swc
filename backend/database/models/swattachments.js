const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swattachments', {
    attachmentid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    downloaditemid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ticketid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    filename: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    filesize: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    filetype: {
      type: DataTypes.STRING(150),
      allowNull: false,
      defaultValue: ""
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    attachmenttype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    storefilename: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    contentid: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'swattachments',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "attachmentid" },
        ]
      },
      {
        name: "attachments1",
        using: "BTREE",
        fields: [
          { name: "linktype" },
          { name: "linktypeid" },
        ]
      },
      {
        name: "attachments2",
        using: "BTREE",
        fields: [
          { name: "attachmenttype" },
        ]
      },
      {
        name: "attachments3",
        using: "BTREE",
        fields: [
          { name: "downloaditemid" },
        ]
      },
      {
        name: "attachments4",
        using: "BTREE",
        fields: [
          { name: "ticketid" },
          { name: "linktype" },
          { name: "linktypeid" },
        ]
      },
      {
        name: "attachments5",
        using: "BTREE",
        fields: [
          { name: "linktype" },
          { name: "ticketid" },
          { name: "linktypeid" },
        ]
      },
      {
        name: "attachments6",
        using: "BTREE",
        fields: [
          { name: "linktype" },
          { name: "ticketid" },
          { name: "attachmentid" },
        ]
      },
    ]
  });
};
