const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swvisitorfootprints', {
    sessionid: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: ""
    },
    pageurl: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    pagehash: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: ""
    },
    pagetitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    countrycode: {
      type: DataTypes.STRING(2),
      allowNull: false,
      defaultValue: ""
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    lastactivity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ipaddress: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "0.0.0.0"
    },
    hostname: {
      type: DataTypes.STRING(80),
      allowNull: false,
      defaultValue: ""
    },
    referrer: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    resolution: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: ""
    },
    colordepth: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ""
    },
    appversion: {
      type: DataTypes.STRING(150),
      allowNull: false,
      defaultValue: ""
    },
    operatingsys: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ""
    },
    browsername: {
      type: DataTypes.STRING(150),
      allowNull: false,
      defaultValue: ""
    },
    browserversion: {
      type: DataTypes.STRING(150),
      allowNull: false,
      defaultValue: ""
    },
    browsercode: {
      type: DataTypes.STRING(2),
      allowNull: false,
      defaultValue: ""
    },
    searchenginename: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ""
    },
    searchstring: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    searchengineurl: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: ""
    },
    platform: {
      type: DataTypes.STRING(150),
      allowNull: false,
      defaultValue: ""
    },
    rowbgcolor: {
      type: DataTypes.STRING(7),
      allowNull: false,
      defaultValue: ""
    },
    rowfrcolor: {
      type: DataTypes.STRING(7),
      allowNull: false,
      defaultValue: ""
    },
    hasnote: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    repeatvisit: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    lastvisit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    lastchat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    topull: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    campaignid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    campaigntitle: {
      type: DataTypes.INTEGER,
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
    tableName: 'swvisitorfootprints',
    timestamps: false,
    indexes: [
      {
        name: "visitorfootprints1",
        unique: true,
        using: "HASH",
        fields: [
          { name: "sessionid" },
          { name: "pagehash" },
        ]
      },
      {
        name: "visitorfootprints2",
        using: "HASH",
        fields: [
          { name: "lastactivity" },
        ]
      },
    ]
  });
};
