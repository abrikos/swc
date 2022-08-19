const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swgeoipcityblocks7', {
    ipfrom: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    ipto: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    blockid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swgeoipcityblocks7',
    timestamps: false,
    indexes: [
      {
        name: "geoipcityblocks1",
        using: "BTREE",
        fields: [
          { name: "ipto" },
        ]
      },
      {
        name: "geoipcityblocks2",
        using: "BTREE",
        fields: [
          { name: "blockid" },
        ]
      },
    ]
  });
};
