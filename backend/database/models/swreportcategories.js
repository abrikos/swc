const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swreportcategories', {
    reportcategoryid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    visibilitytype: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "public"
    },
    staffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'swreportcategories',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "reportcategoryid" },
        ]
      },
      {
        name: "reportcategories1",
        using: "BTREE",
        fields: [
          { name: "visibilitytype" },
        ]
      },
    ]
  });
};
