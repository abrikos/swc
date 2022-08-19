const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swuserproperties', {
    userpropertyid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
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
    updatedateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    keyname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    keyvalue: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'swuserproperties',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userpropertyid" },
        ]
      },
      {
        name: "userproperties1",
        using: "BTREE",
        fields: [
          { name: "userid" },
          { name: "keyname" },
        ]
      },
    ]
  });
};
