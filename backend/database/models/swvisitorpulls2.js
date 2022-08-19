const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swvisitorpulls2', {
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
    tableName: 'swvisitorpulls2',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "visitorsessionid" },
        ]
      },
      {
        name: "visitorpulls21",
        using: "BTREE",
        fields: [
          { name: "staffid" },
        ]
      },
    ]
  });
};
