const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swusers', {
    userid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    usergroupid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    userrole: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    userorganizationid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    salutation: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    fullname: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: ""
    },
    userdesignation: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    phone: {
      type: DataTypes.STRING(25),
      allowNull: false,
      defaultValue: ""
    },
    userpassword: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ""
    },
    islegacypassword: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    lastupdate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    lastvisit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    lastvisit2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    lastactivity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    lastvisitip: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    lastvisitip2: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    isenabled: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    languageid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    timezonephp: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    enabledst: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    useremailcount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    slaplanid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    slaexpirytimeline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    userexpirytimeline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isvalidated: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    profileprompt: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    hasgeoip: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    geoiptimezone: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    geoipisp: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    geoiporganization: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    geoipnetspeed: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    geoipcountry: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: ""
    },
    geoipcountrydesc: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    geoipregion: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    geoipcity: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    geoippostalcode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    geoiplatitude: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    geoiplongitude: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    geoipmetrocode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    geoipareacode: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'swusers',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userid" },
        ]
      },
      {
        name: "users1",
        using: "BTREE",
        fields: [
          { name: "usergroupid" },
        ]
      },
      {
        name: "users2",
        using: "BTREE",
        fields: [
          { name: "isenabled" },
          { name: "dateline" },
        ]
      },
      {
        name: "users3",
        using: "BTREE",
        fields: [
          { name: "userorganizationid" },
        ]
      },
      {
        name: "users4",
        using: "BTREE",
        fields: [
          { name: "fullname" },
          { name: "phone" },
        ]
      },
      {
        name: "users5",
        using: "BTREE",
        fields: [
          { name: "isvalidated" },
          { name: "dateline" },
        ]
      },
    ]
  });
};
