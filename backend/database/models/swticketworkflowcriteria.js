const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swticketworkflowcriteria', {
    ticketworkflowcriteriaid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ticketworkflowid: {
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
    tableName: 'swticketworkflowcriteria',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ticketworkflowcriteriaid" },
        ]
      },
      {
        name: "ticketworkflowcriteria1",
        using: "BTREE",
        fields: [
          { name: "ticketworkflowid" },
        ]
      },
    ]
  });
};
