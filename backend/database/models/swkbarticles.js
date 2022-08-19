const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swkbarticles', {
    kbarticleid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    creator: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    creatorid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    author: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    subject: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    isedited: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    editeddateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    editedstaffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isfeatured: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    allowcomments: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    totalcomments: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    hasattachments: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    articlestatus: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: ""
    },
    articlerating: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    ratinghits: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ratingcount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swkbarticles',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "kbarticleid" },
        ]
      },
      {
        name: "kbarticles1",
        using: "BTREE",
        fields: [
          { name: "creator" },
          { name: "creatorid" },
        ]
      },
      {
        name: "kbarticles2",
        using: "BTREE",
        fields: [
          { name: "kbarticleid" },
          { name: "isfeatured" },
        ]
      },
      {
        name: "kbarticles3",
        using: "BTREE",
        fields: [
          { name: "articlestatus" },
        ]
      },
      {
        name: "kbarticles4",
        using: "BTREE",
        fields: [
          { name: "subject" },
          { name: "kbarticleid" },
        ]
      },
    ]
  });
};
