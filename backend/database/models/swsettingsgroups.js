const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swsettingsgroups', {
    sgroupid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    app: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    displayorder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ishidden: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swsettingsgroups',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "sgroupid" },
        ]
      },
      {
        name: "settingsgroups1",
        using: "BTREE",
        fields: [
          { name: "app" },
        ]
      },
      {
        name: "settingsgroups2",
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
};
