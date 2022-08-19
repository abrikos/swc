const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swonsitesessions', {
    onsitesessionid: {
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
    sessioncode: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: ""
    },
    sessionhash: {
      type: DataTypes.STRING(60),
      allowNull: false,
      defaultValue: ""
    },
    chatsessionid: {
      type: DataTypes.STRING(60),
      allowNull: false,
      defaultValue: ""
    },
    chatobjectid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    configid: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    peerjid: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    localjid: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    staffname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    staffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swonsitesessions',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "onsitesessionid" },
        ]
      },
      {
        name: "onsitesessions1",
        using: "BTREE",
        fields: [
          { name: "sessionhash" },
          { name: "chatsessionid" },
          { name: "chatobjectid" },
        ]
      },
      {
        name: "onsitesessions2",
        using: "BTREE",
        fields: [
          { name: "dateline" },
        ]
      },
      {
        name: "onsitesessions3",
        using: "BTREE",
        fields: [
          { name: "sessioncode" },
        ]
      },
    ]
  });
};
