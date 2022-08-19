const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swtickets', {
    ticketid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ticketmaskid: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ""
    },
    departmentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    departmenttitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    ticketstatusid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ticketstatustitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    priorityid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    prioritytitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    emailqueueid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    staffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ownerstaffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ownerstaffname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    assignstatus: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    fullname: {
      type: DataTypes.STRING(225),
      allowNull: false,
      defaultValue: ""
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      defaultValue: ""
    },
    lastreplier: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    replyto: {
      type: DataTypes.STRING(150),
      allowNull: false,
      defaultValue: ""
    },
    subject: {
      type: DataTypes.STRING(255),
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
    laststaffreplytime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    lastuserreplytime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    slaplanid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ticketslaplanid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    duetime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    totalreplies: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ipaddress: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "0.0.0.0"
    },
    flagtype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    hasnotes: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    hasattachments: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    isemailed: {
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
    charset: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    transferencoding: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ""
    },
    timeworked: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    timebilled: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    dateicon: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    lastpostid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    firstpostid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    tgroupid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    messageid: {
      type: DataTypes.STRING(17),
      allowNull: false,
      defaultValue: ""
    },
    escalationruleid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    hasdraft: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    hasbilling: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    isphonecall: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    isescalated: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    isescalatedvolatile: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    phoneno: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    isautoclosed: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    autocloseruleid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    autoclosestatus: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    autoclosetimeline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    escalatedtime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    followupcount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    hasfollowup: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    hasratings: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    tickethash: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ""
    },
    islinked: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    trasholddepartmentid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    tickettype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    tickettypeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    tickettypetitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    creationmode: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    isfirstcontactresolved: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    wasreopened: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    reopendateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    resolutiondateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    escalationlevelcount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    resolutionseconds: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    resolutionlevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    repliestoresolution: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    averageresponsetime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    averageresponsetimehits: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    firstresponsetime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    resolutionduedateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isresolved: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    iswatched: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    oldeditemailaddress: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    linkkbarticleid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    linkticketmacroid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    bayescategoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    recurrencefromticketid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    averageslaresponsetime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swtickets',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ticketid" },
        ]
      },
      {
        name: "tickets1",
        using: "BTREE",
        fields: [
          { name: "userid" },
          { name: "email" },
          { name: "replyto" },
          { name: "departmentid" },
          { name: "isresolved" },
        ]
      },
      {
        name: "tickets2",
        using: "BTREE",
        fields: [
          { name: "slaplanid" },
          { name: "duetime" },
          { name: "ticketstatusid" },
        ]
      },
      {
        name: "tickets3",
        using: "BTREE",
        fields: [
          { name: "departmentid" },
          { name: "ticketstatusid" },
          { name: "lastactivity" },
        ]
      },
      {
        name: "tickets4",
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "tickets5",
        using: "BTREE",
        fields: [
          { name: "departmentid" },
          { name: "ticketstatusid" },
          { name: "userid" },
        ]
      },
      {
        name: "tickets6",
        using: "BTREE",
        fields: [
          { name: "departmentid" },
          { name: "ticketstatusid" },
          { name: "duetime" },
        ]
      },
      {
        name: "tickets7",
        using: "BTREE",
        fields: [
          { name: "dateline" },
        ]
      },
      {
        name: "tickets8",
        using: "BTREE",
        fields: [
          { name: "departmentid" },
          { name: "ticketstatusid" },
          { name: "lastuserreplytime" },
        ]
      },
      {
        name: "tickets9",
        using: "BTREE",
        fields: [
          { name: "duetime" },
          { name: "resolutionduedateline" },
          { name: "isescalatedvolatile" },
          { name: "isresolved" },
        ]
      },
      {
        name: "tickets10",
        using: "BTREE",
        fields: [
          { name: "ticketmaskid" },
          { name: "ticketid" },
          { name: "departmentid" },
        ]
      },
      {
        name: "tickets11",
        using: "BTREE",
        fields: [
          { name: "departmentid" },
          { name: "ticketstatusid" },
          { name: "duetime" },
          { name: "resolutionduedateline" },
        ]
      },
      {
        name: "tickets12",
        using: "BTREE",
        fields: [
          { name: "isresolved" },
          { name: "departmentid" },
        ]
      },
      {
        name: "tickets13",
        using: "BTREE",
        fields: [
          { name: "ticketstatusid" },
          { name: "departmentid" },
          { name: "priorityid" },
          { name: "tickettypeid" },
        ]
      },
      {
        name: "tickets14",
        using: "BTREE",
        fields: [
          { name: "isescalatedvolatile" },
          { name: "isresolved" },
        ]
      },
      {
        name: "tickets15",
        using: "BTREE",
        fields: [
          { name: "ticketid" },
          { name: "departmentid" },
        ]
      },
      {
        name: "tickets16",
        using: "BTREE",
        fields: [
          { name: "ticketid" },
          { name: "isresolved" },
          { name: "autoclosestatus" },
          { name: "lastactivity" },
        ]
      },
      {
        name: "tickets17",
        using: "BTREE",
        fields: [
          { name: "autoclosestatus" },
          { name: "autocloseruleid" },
          { name: "autoclosetimeline" },
        ]
      },
      {
        name: "tickets18",
        using: "BTREE",
        fields: [
          { name: "lastactivity" },
        ]
      },
      {
        name: "ticketcount",
        using: "BTREE",
        fields: [
          { name: "departmentid" },
          { name: "ticketstatusid" },
          { name: "ownerstaffid" },
          { name: "tickettypeid" },
          { name: "lastactivity" },
        ]
      },
      {
        name: "tickets19",
        using: "BTREE",
        fields: [
          { name: "recurrencefromticketid" },
        ]
      },
    ]
  });
};
