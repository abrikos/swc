const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swnewsitems', {
    newsitemid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    staffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    newstype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    newsstatus: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    author: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    subject: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    emailsubject: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    descriptionhash: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ""
    },
    subjecthash: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ""
    },
    contentshash: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ""
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    expiry: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    issynced: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    syncguidhash: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ""
    },
    syncdateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    edited: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    editedstaffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    editeddateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    totalcomments: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    uservisibilitycustom: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    staffvisibilitycustom: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    allowcomments: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swnewsitems',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "newsitemid" },
        ]
      },
      {
        name: "newsitems1",
        using: "BTREE",
        fields: [
          { name: "newstype" },
          { name: "newsstatus" },
          { name: "expiry" },
          { name: "uservisibilitycustom" },
          { name: "newsitemid" },
        ]
      },
      {
        name: "newsitems2",
        using: "BTREE",
        fields: [
          { name: "issynced" },
          { name: "syncguidhash" },
          { name: "syncdateline" },
        ]
      },
      {
        name: "newsitems3",
        using: "BTREE",
        fields: [
          { name: "dateline" },
        ]
      },
      {
        name: "newsitems4",
        using: "BTREE",
        fields: [
          { name: "newsstatus" },
          { name: "expiry" },
          { name: "staffvisibilitycustom" },
        ]
      },
      {
        name: "newsitems5",
        using: "BTREE",
        fields: [
          { name: "expiry" },
          { name: "staffvisibilitycustom" },
        ]
      },
      {
        name: "newsitems6",
        using: "BTREE",
        fields: [
          { name: "subject" },
        ]
      },
    ]
  });
};
