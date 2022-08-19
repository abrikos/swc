const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swnotificationrules', {
    notificationruleid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ruletype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    staffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    emailprefix: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    isenabled: {
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
    tableName: 'swnotificationrules',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "notificationruleid" },
        ]
      },
      {
        name: "notificationrules1",
        using: "BTREE",
        fields: [
          { name: "ruletype" },
          { name: "isenabled" },
        ]
      },
      {
        name: "notificationrules2",
        using: "BTREE",
        fields: [
          { name: "isenabled" },
        ]
      },
    ]
  });
};
