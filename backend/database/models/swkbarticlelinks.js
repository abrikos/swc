const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swkbarticlelinks', {
    kbarticlelinkid: {
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
    linktype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    linktypeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swkbarticlelinks',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "kbarticlelinkid" },
        ]
      },
      {
        name: "kbarticlelinks1",
        using: "BTREE",
        fields: [
          { name: "kbarticleid" },
        ]
      },
      {
        name: "kbarticlelinks2",
        using: "BTREE",
        fields: [
          { name: "linktype" },
          { name: "linktypeid" },
          { name: "kbarticleid" },
        ]
      },
    ]
  });
};
