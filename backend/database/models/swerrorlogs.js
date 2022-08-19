const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swerrorlogs', {
    errorlogid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    errordetails: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    userdata: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'swerrorlogs',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "errorlogid" },
        ]
      },
      {
        name: "errorlogs1",
        using: "BTREE",
        fields: [
          { name: "type" },
        ]
      },
      {
        name: "errorlogs2",
        using: "BTREE",
        fields: [
          { name: "dateline" },
        ]
      },
    ]
  });
};
