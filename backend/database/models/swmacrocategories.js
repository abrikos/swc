const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swmacrocategories', {
    macrocategoryid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    parentcategoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    categorytype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    restrictstaffgroupid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
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
    tableName: 'swmacrocategories',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "macrocategoryid" },
        ]
      },
      {
        name: "macrocategories1",
        using: "BTREE",
        fields: [
          { name: "parentcategoryid" },
        ]
      },
      {
        name: "macrocategories2",
        using: "BTREE",
        fields: [
          { name: "categorytype" },
          { name: "staffid" },
        ]
      },
    ]
  });
};
