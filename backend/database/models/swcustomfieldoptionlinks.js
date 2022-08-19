const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swcustomfieldoptionlinks', {
    customfieldoptionlinkid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    customfieldid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    customfieldoptionid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swcustomfieldoptionlinks',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "customfieldoptionlinkid" },
        ]
      },
      {
        name: "customfieldoptionlinks1",
        using: "BTREE",
        fields: [
          { name: "customfieldid" },
        ]
      },
      {
        name: "customfieldoptionlinks2",
        using: "BTREE",
        fields: [
          { name: "customfieldoptionid" },
        ]
      },
    ]
  });
};
