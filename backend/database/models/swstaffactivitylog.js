const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swstaffactivitylog', {
    staffactivitylogid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    staffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    staffname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    ipaddress: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    forwardedipaddress: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    useragent: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    actiontype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    sectiontype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    interfacetype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swstaffactivitylog',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "staffactivitylogid" },
        ]
      },
      {
        name: "staffactivitylog1",
        using: "BTREE",
        fields: [
          { name: "interfacetype" },
          { name: "dateline" },
        ]
      },
      {
        name: "staffactivitylog2",
        using: "BTREE",
        fields: [
          { name: "dateline" },
        ]
      },
    ]
  });
};
