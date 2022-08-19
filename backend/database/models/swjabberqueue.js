const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swjabberqueue', {
    jabberqueueid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    messagetype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    dispatchname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    dispatchtype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swjabberqueue',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "jabberqueueid" },
        ]
      },
      {
        name: "jabberqueue1",
        using: "BTREE",
        fields: [
          { name: "messagetype" },
        ]
      },
    ]
  });
};
