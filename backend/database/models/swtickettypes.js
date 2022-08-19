const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swtickettypes', {
    tickettypeid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    departmentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    displayorder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ismaster: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    displayicon: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "public"
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    uservisibilitycustom: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swtickettypes',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "tickettypeid" },
        ]
      },
      {
        name: "tickettypes1",
        using: "BTREE",
        fields: [
          { name: "departmentid" },
        ]
      },
      {
        name: "tickettypes2",
        using: "BTREE",
        fields: [
          { name: "uservisibilitycustom" },
          { name: "tickettypeid" },
        ]
      },
      {
        name: "tickettypes3",
        using: "BTREE",
        fields: [
          { name: "title" },
        ]
      },
    ]
  });
};
