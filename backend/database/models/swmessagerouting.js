const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swmessagerouting', {
    messageroutingid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    departmentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    preservemessage: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    routetotickets: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    routetoemail: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    ticketdepartmentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    forwardemails: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'swmessagerouting',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "messageroutingid" },
        ]
      },
      {
        name: "messagerouting1",
        using: "BTREE",
        fields: [
          { name: "departmentid" },
        ]
      },
    ]
  });
};
