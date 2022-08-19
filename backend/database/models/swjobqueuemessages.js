const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swjobqueuemessages', {
    jobqueuemessageid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    messageuuid: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    serverid: {
      type: DataTypes.INTEGER,
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
    messagestatus: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    statusstage: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    executionpath: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'swjobqueuemessages',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "jobqueuemessageid" },
        ]
      },
      {
        name: "jobqueuemessages1",
        using: "BTREE",
        fields: [
          { name: "serverid" },
        ]
      },
      {
        name: "jobqueuemessages2",
        using: "BTREE",
        fields: [
          { name: "messageuuid" },
        ]
      },
      {
        name: "jobqueuemessages3",
        using: "BTREE",
        fields: [
          { name: "lastupdate" },
        ]
      },
      {
        name: "jobqueuemessages4",
        using: "BTREE",
        fields: [
          { name: "dateline" },
        ]
      },
    ]
  });
};
