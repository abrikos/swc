const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swticketworkflownotifications', {
    ticketworkflownotificationid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ticketworkflowid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    notificationtype: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    subject: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    notificationcontents: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'swticketworkflownotifications',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ticketworkflownotificationid" },
        ]
      },
      {
        name: "ticketworkflownotifications1",
        using: "BTREE",
        fields: [
          { name: "ticketworkflowid" },
        ]
      },
    ]
  });
};
