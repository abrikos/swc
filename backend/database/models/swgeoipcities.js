const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swgeoipcities', {
    blockid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      primaryKey: true
    },
    country: {
      type: DataTypes.STRING(5),
      allowNull: false,
      defaultValue: ""
    },
    region: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    postalcode: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    latitude: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    longitude: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    metrocode: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    areacode: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'swgeoipcities',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "blockid" },
        ]
      },
    ]
  });
};
