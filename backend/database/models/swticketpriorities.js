const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swticketpriorities', {
    priorityid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    displayorder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "public"
    },
    frcolorcode: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    bgcolorcode: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    iscustom: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    },
    ismaster: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 1
    },
    uservisibilitycustom: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swticketpriorities',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "priorityid" },
        ]
      },
      {
        name: "ticketpriorities1",
        using: "BTREE",
        fields: [
          { name: "uservisibilitycustom" },
          { name: "priorityid" },
        ]
      },
      {
        name: "ticketpriorities2",
        using: "BTREE",
        fields: [
          { name: "title" },
        ]
      },
    ]
  });
};
