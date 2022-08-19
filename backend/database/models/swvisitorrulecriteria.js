const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swvisitorrulecriteria', {
    visitorrulecriteriaid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    visitorruleid: {
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
    }
  }, {
    sequelize,
    tableName: 'swvisitorrulecriteria',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "visitorrulecriteriaid" },
        ]
      },
      {
        name: "visitorrulecriteria1",
        using: "BTREE",
        fields: [
          { name: "visitorruleid" },
        ]
      },
    ]
  });
};
