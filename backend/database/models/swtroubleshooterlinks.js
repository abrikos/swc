const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swtroubleshooterlinks', {
    troubleshooterlinkid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    troubleshootercategoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    parenttroubleshooterstepid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    childtroubleshooterstepid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swtroubleshooterlinks',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "troubleshooterlinkid" },
        ]
      },
      {
        name: "troubleshooterlinks1",
        using: "BTREE",
        fields: [
          { name: "troubleshootercategoryid" },
          { name: "parenttroubleshooterstepid" },
          { name: "childtroubleshooterstepid" },
        ]
      },
    ]
  });
};
