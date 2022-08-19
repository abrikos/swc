const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swmailqueuedata', {
    mailqueuedataid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    toemail: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    fromemail: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    fromname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    subject: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    datatext: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    datahtml: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ishtml: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swmailqueuedata',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "mailqueuedataid" },
        ]
      },
    ]
  });
};
