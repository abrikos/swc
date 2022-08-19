const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swcomments', {
    commentid: {
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
    creatortype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    creatorid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    commenttype: {
      type: DataTypes.SMALLINT,
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
    ipaddress: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "0.0.0.0"
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    parentcommentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    commentstatus: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    useragent: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    referrer: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    parenturl: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'swcomments',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "commentid" },
        ]
      },
      {
        name: "comments1",
        using: "BTREE",
        fields: [
          { name: "commenttype" },
          { name: "commentstatus" },
          { name: "typeid" },
        ]
      },
      {
        name: "comments2",
        using: "BTREE",
        fields: [
          { name: "parentcommentid" },
        ]
      },
      {
        name: "comments3",
        using: "BTREE",
        fields: [
          { name: "dateline" },
        ]
      },
    ]
  });
};
