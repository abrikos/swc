const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swstaff', {
    staffid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    lastname: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    fullname: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: ""
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    staffpassword: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    islegacypassword: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    designation: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: ""
    },
    greeting: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    staffgroupid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    mobilenumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ""
    },
    statusmessage: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    lastprofileupdate: {
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
    enabledst: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    startofweek: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    pmunread: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    groupassigns: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    },
    enablepmalerts: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    },
    enablepmjsalerts: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    },
    ticketviewid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isenabled: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    },
    passwordupdatetimeline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    iprestriction: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    timezonephp: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'swstaff',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "staffid" },
        ]
      },
      {
        name: "staff1",
        using: "BTREE",
        fields: [
          { name: "staffgroupid" },
        ]
      },
    ]
  });
};
