const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swuseremails', {
    useremailid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    linktype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    linktypeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    isprimary: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swuseremails',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "useremailid" },
        ]
      },
      {
        name: "useremails1",
        using: "BTREE",
        fields: [
          { name: "linktype" },
          { name: "linktypeid" },
          { name: "isprimary" },
        ]
      },
      {
        name: "useremails2",
        using: "BTREE",
        fields: [
          { name: "linktype" },
          { name: "email" },
        ]
      },
      {
        name: "useremails3",
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "useremails4",
        using: "BTREE",
        fields: [
          { name: "linktype" },
          { name: "useremailid" },
        ]
      },
    ]
  });
};
