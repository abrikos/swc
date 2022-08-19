const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swstaffloginlog', {
    staffloginlogid: {
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
    staffname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    staffusername: {
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
    tableName: 'swstaffloginlog',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "staffloginlogid" },
        ]
      },
      {
        name: "staffloginlog1",
        using: "BTREE",
        fields: [
          { name: "staffid" },
          { name: "logindateline" },
          { name: "interfacetype" },
        ]
      },
      {
        name: "staffloginlog2",
        using: "BTREE",
        fields: [
          { name: "staffusername" },
          { name: "logindateline" },
          { name: "loginresult" },
        ]
      },
      {
        name: "staffloginlog3",
        using: "BTREE",
        fields: [
          { name: "logindateline" },
          { name: "loginresult" },
        ]
      },
      {
        name: "staffloginlog4",
        using: "BTREE",
        fields: [
          { name: "sessionid" },
        ]
      },
    ]
  });
};
