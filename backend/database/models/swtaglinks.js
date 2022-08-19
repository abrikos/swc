const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swtaglinks', {
    taglinkid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    staffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    tagid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    linktype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    linkid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swtaglinks',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "taglinkid" },
        ]
      },
      {
        name: "taglinks1",
        using: "BTREE",
        fields: [
          { name: "tagid" },
          { name: "linktype" },
        ]
      },
      {
        name: "taglinks2",
        using: "BTREE",
        fields: [
          { name: "linktype" },
          { name: "linkid" },
        ]
      },
    ]
  });
};
