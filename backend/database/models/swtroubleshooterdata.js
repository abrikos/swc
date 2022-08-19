const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swtroubleshooterdata', {
    troubleshooterdataid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    troubleshooterstepid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'swtroubleshooterdata',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "troubleshooterdataid" },
        ]
      },
      {
        name: "troubleshooterdata1",
        using: "BTREE",
        fields: [
          { name: "troubleshooterstepid" },
        ]
      },
    ]
  });
};
