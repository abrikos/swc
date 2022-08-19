const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swparserlooprules', {
    parserloopruleid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    length: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    maxhits: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    restoreafter: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ismaster: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swparserlooprules',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "parserloopruleid" },
        ]
      },
    ]
  });
};
