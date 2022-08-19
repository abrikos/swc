const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swslarulecriteria', {
    slarulecriteriaid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    slaplanid: {
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
    tableName: 'swslarulecriteria',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "slarulecriteriaid" },
        ]
      },
      {
        name: "slarulecriteria1",
        using: "BTREE",
        fields: [
          { name: "slaplanid" },
        ]
      },
    ]
  });
};
