const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swvisitorrules', {
    visitorruleid: {
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
    ruletype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
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
    matchtype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    stopprocessing: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swvisitorrules',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "visitorruleid" },
        ]
      },
      {
        name: "visitorrules1",
        using: "BTREE",
        fields: [
          { name: "ruletype" },
        ]
      },
      {
        name: "visitorrules2",
        using: "BTREE",
        fields: [
          { name: "title" },
        ]
      },
    ]
  });
};
