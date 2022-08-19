const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swkbarticlesubscribers', {
    kbarticlesubscriberid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    kbarticleid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    creator: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    creatorid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "0"
    }
  }, {
    sequelize,
    tableName: 'swkbarticlesubscribers',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "kbarticlesubscriberid" },
        ]
      },
      {
        name: "kbarticlesubscribers1",
        using: "BTREE",
        fields: [
          { name: "kbarticleid" },
        ]
      },
    ]
  });
};
