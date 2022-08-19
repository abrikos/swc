const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swchatobjects', {
    chatobjectid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    chatobjectmaskid: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ""
    },
    visitorsessionid: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: ""
    },
    chatsessionid: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: ""
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    lastpostactivity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    userpostactivity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    staffpostactivity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    userfullname: {
      type: DataTypes.STRING(150),
      allowNull: false,
      defaultValue: ""
    },
    useremail: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    subject: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    staffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    staffname: {
      type: DataTypes.STRING(150),
      allowNull: false,
      defaultValue: ""
    },
    chatstatus: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    transferfromid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    transfertoid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    transferstatus: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    transfertimeline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    roundrobintimeline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    roundrobinhits: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    departmentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    departmenttitle: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    chattype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    ipaddress: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ""
    },
    waittime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    chatskillid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isproactive: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    creatorstaffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    tgroupid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isphone: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    phonenumber: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    callstatus: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    isindexed: {
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
    tableName: 'swchatobjects',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "chatobjectid" },
        ]
      },
      {
        name: "chatobjects1",
        using: "BTREE",
        fields: [
          { name: "chatstatus" },
          { name: "staffid" },
          { name: "lastpostactivity" },
        ]
      },
      {
        name: "chatobjects2",
        using: "BTREE",
        fields: [
          { name: "chatstatus" },
          { name: "chattype" },
        ]
      },
      {
        name: "chatobjects3",
        using: "BTREE",
        fields: [
          { name: "visitorsessionid" },
        ]
      },
      {
        name: "chatobjects4",
        using: "BTREE",
        fields: [
          { name: "staffid" },
        ]
      },
      {
        name: "chatobjects5",
        using: "BTREE",
        fields: [
          { name: "userid" },
          { name: "useremail" },
        ]
      },
      {
        name: "chatobjects6",
        using: "BTREE",
        fields: [
          { name: "ipaddress" },
        ]
      },
      {
        name: "chatobjects7",
        using: "BTREE",
        fields: [
          { name: "departmentid" },
          { name: "dateline" },
        ]
      },
      {
        name: "chatobjects8",
        using: "BTREE",
        fields: [
          { name: "useremail" },
        ]
      },
      {
        name: "chatobjects9",
        using: "BTREE",
        fields: [
          { name: "chatstatus" },
          { name: "staffid" },
          { name: "dateline" },
        ]
      },
      {
        name: "chatobjects10",
        using: "BTREE",
        fields: [
          { name: "chatstatus" },
          { name: "chatobjectid" },
          { name: "staffid" },
        ]
      },
      {
        name: "chatobjects11",
        using: "BTREE",
        fields: [
          { name: "chatstatus" },
          { name: "dateline" },
          { name: "lastpostactivity" },
        ]
      },
      {
        name: "chatobjects12",
        using: "BTREE",
        fields: [
          { name: "departmentid" },
          { name: "chatstatus" },
        ]
      },
      {
        name: "chatobjects13",
        using: "BTREE",
        fields: [
          { name: "dateline" },
        ]
      },
      {
        name: "chatobjects14",
        using: "BTREE",
        fields: [
          { name: "chatobjectmaskid" },
          { name: "departmentid" },
        ]
      },
      {
        name: "chatobjects15",
        using: "BTREE",
        fields: [
          { name: "chatstatus" },
          { name: "staffid" },
          { name: "isphone" },
        ]
      },
      {
        name: "chatobjects16",
        using: "BTREE",
        fields: [
          { name: "isindexed" },
          { name: "chatstatus" },
        ]
      },
      {
        name: "chatobjects17",
        using: "BTREE",
        fields: [
          { name: "subject", length: 220 },
          { name: "userfullname", length: 30 },
          { name: "useremail", length: 40 },
          { name: "phonenumber", length: 15 },
        ]
      },
    ]
  });
};
