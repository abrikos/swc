const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swtemplates', {
    templateid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tgroupid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    tcategoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    templateversion: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "1.00.00"
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      defaultValue: ""
    },
    templatelength: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    modified: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "notmodified"
    },
    contentshash: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: ""
    },
    iscustom: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    contentsdefaulthash: {
      type: DataTypes.STRING(32),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'swtemplates',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "templateid" },
        ]
      },
      {
        name: "templates1",
        using: "BTREE",
        fields: [
          { name: "tgroupid" },
          { name: "name" },
        ]
      },
      {
        name: "templates2",
        using: "BTREE",
        fields: [
          { name: "tcategoryid" },
        ]
      },
    ]
  });
};
