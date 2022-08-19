const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swvisitorpulls', {
    visitorsessionid: {
      type: DataTypes.STRING(32),
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
    }
  }, {
    sequelize,
    tableName: 'swvisitorpulls',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "HASH",
        fields: [
          { name: "visitorsessionid" },
        ]
      },
      {
        name: "visitorpulls1",
        using: "HASH",
        fields: [
          { name: "staffid" },
        ]
      },
    ]
  });
};
