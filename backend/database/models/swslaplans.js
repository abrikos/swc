const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swslaplans', {
    slaplanid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    slascheduleid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    overduehrs: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    resolutionduehrs: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    isenabled: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    sortorder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ruletype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swslaplans',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "slaplanid" },
        ]
      },
      {
        name: "slaplans1",
        using: "BTREE",
        fields: [
          { name: "slascheduleid" },
        ]
      },
      {
        name: "slaplans2",
        using: "BTREE",
        fields: [
          { name: "title" },
        ]
      },
    ]
  });
};
