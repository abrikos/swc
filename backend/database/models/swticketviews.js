const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('swticketviews', {
    ticketviewid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ""
    },
    viewscope: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    staffid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    viewalltickets: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    viewunassigned: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    viewassigned: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    sortby: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    sortorder: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    ismaster: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    dateline: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ticketsperpage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    autorefresh: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    setasowner: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    defaultstatusonreply: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    },
    afterreplyaction: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'swticketviews',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ticketviewid" },
        ]
      },
      {
        name: "ticketviews1",
        using: "BTREE",
        fields: [
          { name: "viewscope" },
          { name: "staffid" },
        ]
      },
    ]
  });
};
