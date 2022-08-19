const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swticketposts', {
    ticketpostid: {
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
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    fullname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    emailto: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    subject: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    ipaddress: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "0.0.0.0"
    },
    hasattachments: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    edited: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    editedbystaffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    editeddateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    creator: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    isthirdparty: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    ishtml: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    isemailed: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    isprivate: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    staffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contenthash: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ""
    },
    subjecthash: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ""
    },
    issurveycomment: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    creationmode: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    responsetime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    firstresponsetime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    slaresponsetime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swticketposts',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ticketpostid" },
        ]
      },
      {
        name: "ticketposts1",
        using: "BTREE",
        fields: [
          { name: "ticketid" },
          { name: "staffid" },
        ]
      },
      {
        name: "ticketposts2",
        using: "BTREE",
        fields: [
          { name: "email" },
          { name: "subjecthash" },
        ]
      },
      {
        name: "ticketposts3",
        using: "BTREE",
        fields: [
          { name: "creator" },
          { name: "staffid" },
          { name: "dateline" },
        ]
      },
      {
        name: "ticketposts4",
        using: "BTREE",
        fields: [
          { name: "responsetime" },
        ]
      },
      {
        name: "ticketposts5",
        using: "BTREE",
        fields: [
          { name: "firstresponsetime" },
        ]
      },
    ]
  });
};
