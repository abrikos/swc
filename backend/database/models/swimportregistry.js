const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swimportregistry', {
    importregistryid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    section: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ""
    },
    vkey: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: ""
    },
    data: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    nocache: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swimportregistry',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "importregistryid" },
        ]
      },
      {
        name: "importregistry1",
        using: "BTREE",
        fields: [
          { name: "section" },
          { name: "vkey" },
        ]
      },
      {
        name: "importregistry2",
        using: "BTREE",
        fields: [
          { name: "nocache" },
        ]
      },
    ]
  });
};
