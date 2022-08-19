const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swcustomfielddeplinks', {
    customfielddeplinkid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    customfieldgroupid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    departmentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swcustomfielddeplinks',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "customfielddeplinkid" },
        ]
      },
      {
        name: "customfielddeplinks1",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "customfieldgroupid" },
          { name: "departmentid" },
        ]
      },
    ]
  });
};
