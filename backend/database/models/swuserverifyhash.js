const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swuserverifyhash', {
    userverifyhashid: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    hashtype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swuserverifyhash',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userverifyhashid" },
        ]
      },
      {
        name: "userverifyhash1",
        using: "BTREE",
        fields: [
          { name: "hashtype" },
          { name: "dateline" },
        ]
      },
      {
        name: "userverifyhash2",
        using: "BTREE",
        fields: [
          { name: "userid" },
          { name: "hashtype" },
        ]
      },
    ]
  });
};
