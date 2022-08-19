const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swfiles', {
    fileid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    filename: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    originalfilename: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    filehash: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ""
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    expiry: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    subdirectory: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'swfiles',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "fileid" },
        ]
      },
      {
        name: "files1",
        using: "BTREE",
        fields: [
          { name: "dateline" },
          { name: "expiry" },
        ]
      },
      {
        name: "files2",
        using: "BTREE",
        fields: [
          { name: "expiry" },
        ]
      },
    ]
  });
};
