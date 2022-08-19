const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swsessions', {
    sessionid: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: "",
      primaryKey: true
    },
    ipaddress: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "0.0.0.0"
    },
    lastactivity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    lastactivitycustom: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    useragent: {
      type: DataTypes.STRING(60),
      allowNull: false,
      defaultValue: ""
    },
    isloggedin: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    sessiontype: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    typeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    sessionhits: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    status: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    phonestatus: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    captcha: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ""
    },
    gridcolor: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: ""
    },
    visitorgroupid: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    departmentid: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    proactiveresult: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    ticketviewid: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    iswinapp: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    csrfhash: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ""
    },
    languagecode: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'swsessions',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "HASH",
        fields: [
          { name: "sessionid" },
        ]
      },
      {
        name: "sessions1",
        using: "HASH",
        fields: [
          { name: "sessiontype" },
          { name: "lastactivity" },
          { name: "status" },
        ]
      },
      {
        name: "sessions2",
        using: "HASH",
        fields: [
          { name: "typeid" },
          { name: "sessiontype" },
        ]
      },
      {
        name: "sessions3",
        using: "HASH",
        fields: [
          { name: "sessionid" },
          { name: "sessiontype" },
        ]
      },
    ]
  });
};
