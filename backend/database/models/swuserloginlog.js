const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swuserloginlog', {
    userloginlogid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    logindateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    activitydateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    logoutdateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    userfullname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    useremail: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    ipaddress: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "0.0.0.0"
    },
    forwardedipaddress: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "0.0.0.0"
    },
    useragent: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    sessionid: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    logouttype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    loginresult: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    interfacetype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swuserloginlog',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userloginlogid" },
        ]
      },
      {
        name: "userloginlog1",
        using: "BTREE",
        fields: [
          { name: "userid" },
          { name: "logindateline" },
          { name: "interfacetype" },
        ]
      },
      {
        name: "userloginlog2",
        using: "BTREE",
        fields: [
          { name: "userfullname" },
          { name: "logindateline" },
          { name: "loginresult" },
        ]
      },
      {
        name: "userloginlog3",
        using: "BTREE",
        fields: [
          { name: "logindateline" },
          { name: "loginresult" },
        ]
      },
      {
        name: "userloginlog4",
        using: "BTREE",
        fields: [
          { name: "sessionid" },
        ]
      },
    ]
  });
};
