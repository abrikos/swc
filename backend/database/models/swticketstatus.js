const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swticketstatus', {
    ticketstatusid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    displayorder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    iscustom: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    },
    displayinmainlist: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    markasresolved: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    ismaster: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    statustype: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "public"
    },
    displaycount: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    statuscolor: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ""
    },
    statusbgcolor: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ""
    },
    departmentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "public"
    },
    resetduetime: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    displayicon: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    staffvisibilitycustom: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    dispatchnotification: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    triggersurvey: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swticketstatus',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ticketstatusid" },
        ]
      },
      {
        name: "ticketstatus1",
        using: "BTREE",
        fields: [
          { name: "title" },
        ]
      },
    ]
  });
};
