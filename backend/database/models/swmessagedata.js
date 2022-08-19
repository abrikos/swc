const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swmessagedata', {
    messagedataid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    messageid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    contenttype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'swmessagedata',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "messagedataid" },
        ]
      },
      {
        name: "messagedata1",
        using: "BTREE",
        fields: [
          { name: "messageid" },
          { name: "contenttype" },
        ]
      },
      {
        name: "messagedata2",
        using: "BTREE",
        fields: [
          { name: "contenttype" },
          { name: "messageid" },
        ]
      },
    ]
  });
};
