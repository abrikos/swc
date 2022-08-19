const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swcannedresponsedata', {
    cannedresponsedataid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cannedresponseid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'swcannedresponsedata',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cannedresponsedataid" },
        ]
      },
      {
        name: "cannedresponsedata1",
        using: "BTREE",
        fields: [
          { name: "cannedresponseid" },
        ]
      },
    ]
  });
};
