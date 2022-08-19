const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swparserrules', {
    parserruleid: {
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
    dateline: {
      type: DataTypes.INTEGER,
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
    matchtype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    stopprocessing: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    isenabled: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swparserrules',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "parserruleid" },
        ]
      },
      {
        name: "parserrules1",
        using: "BTREE",
        fields: [
          { name: "title" },
        ]
      },
    ]
  });
};
