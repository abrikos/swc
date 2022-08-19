const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swsettings', {
    settingid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    section: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ""
    },
    vkey: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ""
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'swsettings',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "settingid" },
        ]
      },
      {
        name: "settings1",
        using: "BTREE",
        fields: [
          { name: "section" },
          { name: "vkey" },
        ]
      },
    ]
  });
};
