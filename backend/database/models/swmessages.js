const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swmessages', {
    messageid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    messagemaskid: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ""
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    replydateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    fullname: {
      type: DataTypes.STRING(150),
      allowNull: false,
      defaultValue: ""
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      defaultValue: ""
    },
    subject: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    departmentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    parentmessageid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    messagestatus: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    messagetype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    messagerating: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    chatobjectid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    staffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    staffname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
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
    tableName: 'swmessages',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "messageid" },
        ]
      },
      {
        name: "messages1",
        using: "BTREE",
        fields: [
          { name: "departmentid" },
          { name: "messagestatus" },
        ]
      },
      {
        name: "messages2",
        using: "BTREE",
        fields: [
          { name: "staffid" },
        ]
      },
      {
        name: "messages3",
        using: "BTREE",
        fields: [
          { name: "messagestatus" },
          { name: "dateline" },
        ]
      },
      {
        name: "messages4",
        using: "BTREE",
        fields: [
          { name: "messagetype" },
          { name: "messagerating" },
        ]
      },
      {
        name: "messages5",
        using: "BTREE",
        fields: [
          { name: "messagerating" },
        ]
      },
      {
        name: "messages6",
        using: "BTREE",
        fields: [
          { name: "messagetype" },
          { name: "messagestatus" },
          { name: "messagerating" },
        ]
      },
      {
        name: "messages7",
        using: "BTREE",
        fields: [
          { name: "messagemaskid" },
        ]
      },
      {
        name: "messages8",
        using: "BTREE",
        fields: [
          { name: "dateline" },
        ]
      },
      {
        name: "messages9",
        using: "BTREE",
        fields: [
          { name: "chatobjectid" },
        ]
      },
      {
        name: "messages10",
        using: "BTREE",
        fields: [
          { name: "subject", length: 250 },
          { name: "fullname", length: 30 },
          { name: "email", length: 40 },
        ]
      },
      {
        name: "messages11",
        using: "BTREE",
        fields: [
          { name: "departmentid" },
        ]
      },
      {
        name: "messages12",
        using: "BTREE",
        fields: [
          { name: "messagemaskid" },
          { name: "departmentid" },
        ]
      },
    ]
  });
};
