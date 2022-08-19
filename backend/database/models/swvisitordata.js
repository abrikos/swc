const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swvisitordata', {
    visitordataid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    visitorsessionid: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: ""
    },
    visitorruleid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    datakey: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    datavalue: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    datatype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swvisitordata',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "visitordataid" },
        ]
      },
      {
        name: "visitordata1",
        using: "BTREE",
        fields: [
          { name: "visitorsessionid" },
          { name: "datatype" },
        ]
      },
      {
        name: "visitordata2",
        using: "BTREE",
        fields: [
          { name: "visitorruleid" },
        ]
      },
      {
        name: "visitordata3",
        using: "BTREE",
        fields: [
          { name: "visitorsessionid" },
          { name: "visitorruleid" },
        ]
      },
    ]
  });
};
