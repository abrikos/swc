const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swratings', {
    ratingid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    departmentid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    displayorder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ratingscale: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    ratingvisibility: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "private"
    },
    ratingtype: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    staffvisibilitycustom: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    uservisibilitycustom: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    iseditable: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    isclientonly: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    ratingtitle: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'swratings',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ratingid" },
        ]
      },
      {
        name: "ratings1",
        using: "BTREE",
        fields: [
          { name: "ratingtype" },
          { name: "departmentid" },
        ]
      },
      {
        name: "ratings2",
        using: "BTREE",
        fields: [
          { name: "departmentid" },
        ]
      },
    ]
  });
};
