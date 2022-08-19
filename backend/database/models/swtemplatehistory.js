const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swtemplatehistory', {
    templatehistoryid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    templateid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    staffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    changelognotes: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    templatelength: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    templateversion: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "1.00.00"
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contentshash: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'swtemplatehistory',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "templatehistoryid" },
        ]
      },
      {
        name: "templatehistory1",
        using: "BTREE",
        fields: [
          { name: "templateid" },
        ]
      },
    ]
  });
};
