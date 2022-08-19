const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swdepartments', {
    departmentid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    departmenttype: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "public"
    },
    departmentapp: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "tickets"
    },
    isdefault: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    displayorder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    parentdepartmentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    uservisibilitycustom: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swdepartments',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "departmentid" },
        ]
      },
      {
        name: "departments1",
        using: "BTREE",
        fields: [
          { name: "departmentapp" },
        ]
      },
      {
        name: "departments2",
        using: "BTREE",
        fields: [
          { name: "departmenttype" },
        ]
      },
      {
        name: "departments3",
        using: "BTREE",
        fields: [
          { name: "parentdepartmentid" },
          { name: "departmentapp" },
          { name: "departmentid" },
          { name: "departmenttype" },
        ]
      },
    ]
  });
};
