const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swchatchilds', {
    chatchildid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    chatobjectid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    staffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isinvite: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    isobserver: {
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
    tableName: 'swchatchilds',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "HASH",
        fields: [
          { name: "chatchildid" },
        ]
      },
      {
        name: "chatchilds1",
        using: "HASH",
        fields: [
          { name: "chatobjectid" },
          { name: "staffid" },
        ]
      },
      {
        name: "chatchilds2",
        using: "HASH",
        fields: [
          { name: "staffid" },
        ]
      },
      {
        name: "chatchilds3",
        using: "HASH",
        fields: [
          { name: "chatobjectid" },
          { name: "isinvite" },
        ]
      },
    ]
  });
};
