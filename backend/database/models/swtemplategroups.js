const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swtemplategroups', {
    tgroupid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    languageid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isenabled: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    guestusergroupid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    regusergroupid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    title: {
      type: DataTypes.STRING(155),
      allowNull: false,
      defaultValue: ""
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    companyname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    ismaster: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    enablepassword: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    groupusername: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    grouppassword: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: ""
    },
    restrictgroups: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    isdefault: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    useloginshare: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    loginapi_appid: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    ticketstatusid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    priorityid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    departmentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    tickettypeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    departmentid_livechat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    tickets_prompttype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    tickets_promptpriority: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swtemplategroups',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tgroupid" },
        ]
      },
    ]
  });
};
