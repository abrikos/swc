const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swcron', {
    cronid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nextrun: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    lastrun: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    chour: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    cminute: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    cday: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    app: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    controller: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    action: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    autorun: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'swcron',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cronid" },
        ]
      },
    ]
  });
};
