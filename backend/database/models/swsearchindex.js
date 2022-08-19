const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swsearchindex', {
    objid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    subobjid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    type: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    ft: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'swsearchindex',
    timestamps: false,
    indexes: [
      {
        name: "searchindex1",
        using: "BTREE",
        fields: [
          { name: "objid" },
        ]
      },
      {
        name: "searchindex2",
        using: "BTREE",
        fields: [
          { name: "type" },
          { name: "objid" },
        ]
      },
      {
        name: "searchindex3",
        using: "BTREE",
        fields: [
          { name: "objid" },
          { name: "type" },
        ]
      },
      {
        name: "searchindex4",
        using: "BTREE",
        fields: [
          { name: "objid" },
          { name: "subobjid" },
          { name: "type" },
        ]
      },
      {
        name: "fulltextsearch",
        type: "FULLTEXT",
        fields: [
          { name: "ft" },
        ]
      },
    ]
  });
};
