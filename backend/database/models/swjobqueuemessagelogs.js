const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swjobqueuemessagelogs', {
    jobqueuemessagelogid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    jobqueuemessageid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    dateline: {
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
    updatecontents: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'swjobqueuemessagelogs',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "jobqueuemessagelogid" },
        ]
      },
      {
        name: "jobqueuemessagelogs1",
        using: "BTREE",
        fields: [
          { name: "jobqueuemessageid" },
        ]
      },
      {
        name: "jobqueuemessagelogs2",
        using: "BTREE",
        fields: [
          { name: "dateline" },
        ]
      },
    ]
  });
};
