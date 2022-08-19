const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swsettingsfields', {
    sfieldid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    sgroupid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: ""
    },
    customvalue: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    iscustom: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    settingtype: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "text"
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
    }
  }, {
    sequelize,
    tableName: 'swsettingsfields',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "sfieldid" },
        ]
      },
      {
        name: "settingsfields1",
        using: "BTREE",
        fields: [
          { name: "sgroupid" },
        ]
      },
    ]
  });
};
