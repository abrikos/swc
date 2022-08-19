const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swusernotedata', {
    usernotedataid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    usernoteid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    notecontents: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'swusernotedata',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "usernotedataid" },
        ]
      },
      {
        name: "usernotedata1",
        using: "BTREE",
        fields: [
          { name: "usernoteid" },
        ]
      },
    ]
  });
};
