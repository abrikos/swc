const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swjiraissues', {
    jiraissueid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ticketid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    issueid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    issuekey: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'swjiraissues',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "jiraissueid" },
        ]
      },
      {
        name: "jiraissues1",
        using: "BTREE",
        fields: [
          { name: "ticketid" },
          { name: "issueid" },
        ]
      },
    ]
  });
};
