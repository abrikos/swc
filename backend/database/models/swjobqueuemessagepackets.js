const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swjobqueuemessagepackets', {
    jobqueuemessagepacketid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    queuename: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "0"
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    receipthandle: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    messagebody: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    verifyhash: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    controllerparentclass: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'swjobqueuemessagepackets',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "jobqueuemessagepacketid" },
        ]
      },
      {
        name: "jobqueuemessagepackets1",
        using: "BTREE",
        fields: [
          { name: "queuename" },
        ]
      },
      {
        name: "jobqueuemessagepackets2",
        using: "BTREE",
        fields: [
          { name: "dateline" },
        ]
      },
    ]
  });
};
