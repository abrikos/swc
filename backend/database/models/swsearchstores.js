const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swsearchstores', {
    searchstoreid: {
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
    sessionid: {
      type: DataTypes.STRING(70),
      allowNull: false,
      defaultValue: ""
    },
    lastupdate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    staffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    storetype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swsearchstores',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "searchstoreid" },
        ]
      },
      {
        name: "searchstores1",
        using: "BTREE",
        fields: [
          { name: "sessionid" },
        ]
      },
      {
        name: "searchstores2",
        using: "BTREE",
        fields: [
          { name: "storetype" },
          { name: "staffid" },
        ]
      },
      {
        name: "searchstores3",
        using: "BTREE",
        fields: [
          { name: "storetype" },
          { name: "userid" },
        ]
      },
    ]
  });
};
