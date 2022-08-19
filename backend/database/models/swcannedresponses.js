const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swcannedresponses', {
    cannedresponseid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cannedcategoryid: {
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
    },
    urldata: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    imagedata: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    responsetype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swcannedresponses',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cannedresponseid" },
        ]
      },
      {
        name: "cannedresponses1",
        using: "BTREE",
        fields: [
          { name: "cannedcategoryid" },
        ]
      },
      {
        name: "cannedresponses2",
        using: "BTREE",
        fields: [
          { name: "staffid" },
        ]
      },
    ]
  });
};
