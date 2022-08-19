const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swparserrulecriteria', {
    parserrulecriteriaid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    parserruleid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    ruleop: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    rulematch: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    rulematchtype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swparserrulecriteria',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "parserrulecriteriaid" },
        ]
      },
      {
        name: "parserrulecriteria1",
        using: "BTREE",
        fields: [
          { name: "parserruleid" },
        ]
      },
    ]
  });
};
