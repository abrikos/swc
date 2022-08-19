const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swuserorganizations', {
    userorganizationid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    organizationname: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    organizationtype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    address: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: ""
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    state: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    postalcode: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    phone: {
      type: DataTypes.STRING(25),
      allowNull: false,
      defaultValue: ""
    },
    fax: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: ""
    },
    website: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    lastupdate: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    languageid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    slaplanid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    slaexpirytimeline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    usergroupid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swuserorganizations',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userorganizationid" },
        ]
      },
      {
        name: "userorganizations1",
        using: "BTREE",
        fields: [
          { name: "organizationname" },
          { name: "address" },
          { name: "phone" },
        ]
      },
    ]
  });
};
