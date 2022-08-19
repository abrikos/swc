const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swstaffprofileimages', {
    staffprofileimageid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    staffid: {
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
    tableName: 'swstaffprofileimages',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "staffprofileimageid" },
        ]
      },
      {
        name: "staffprofileimages1",
        using: "BTREE",
        fields: [
          { name: "staffid" },
          { name: "type" },
        ]
      },
    ]
  });
};
