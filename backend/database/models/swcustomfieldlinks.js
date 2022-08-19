const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swcustomfieldlinks', {
    customfieldlinkid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    grouptype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    linktypeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    customfieldgroupid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swcustomfieldlinks',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "customfieldlinkid" },
        ]
      },
      {
        name: "customfieldlinks1",
        using: "BTREE",
        fields: [
          { name: "grouptype" },
          { name: "linktypeid" },
          { name: "customfieldgroupid" },
        ]
      },
      {
        name: "customfieldlinks2",
        using: "BTREE",
        fields: [
          { name: "customfieldgroupid" },
        ]
      },
    ]
  });
};
