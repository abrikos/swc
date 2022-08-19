const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swchatskilllinks', {
    chatskilllinkid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    chatskillid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    staffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swchatskilllinks',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "chatskilllinkid" },
        ]
      },
      {
        name: "chatskilllinks1",
        using: "BTREE",
        fields: [
          { name: "chatskillid" },
        ]
      },
      {
        name: "chatskilllinks2",
        using: "BTREE",
        fields: [
          { name: "staffid" },
        ]
      },
    ]
  });
};
