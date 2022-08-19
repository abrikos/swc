const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swratingresults', {
    ratingresultid: {
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
    typeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ratingid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ratingresult: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    creatorid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    creatortype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    isedited: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    editorid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    editortype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swratingresults',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ratingresultid" },
        ]
      },
      {
        name: "ratingresults1",
        using: "BTREE",
        fields: [
          { name: "ratingid" },
        ]
      },
      {
        name: "ratingresults2",
        using: "BTREE",
        fields: [
          { name: "typeid" },
          { name: "ratingid" },
        ]
      },
    ]
  });
};
