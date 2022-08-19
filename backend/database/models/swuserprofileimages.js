const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swuserprofileimages', {
    userprofileimageid: {
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
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    extension: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    imagedata: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'swuserprofileimages',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "userprofileimageid" },
        ]
      },
      {
        name: "userprofileimages1",
        using: "BTREE",
        fields: [
          { name: "userid" },
        ]
      },
    ]
  });
};
