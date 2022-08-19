const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swcustomfieldoptions', {
    customfieldoptionid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    customfieldid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    optionvalue: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    displayorder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isselected: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    parentcustomfieldoptionid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swcustomfieldoptions',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "customfieldoptionid" },
        ]
      },
      {
        name: "customfieldoptions1",
        using: "BTREE",
        fields: [
          { name: "customfieldid" },
        ]
      },
      {
        name: "customfieldoptions2",
        using: "BTREE",
        fields: [
          { name: "parentcustomfieldoptionid" },
        ]
      },
    ]
  });
};
