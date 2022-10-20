module.exports = (db) => {
  db.swusers.hasMany(db.swuseremails, {foreignKey: 'linktypeid'})
  db.swuseremails.hasMany(db.tokens, {foreignKey: 'userId'})
  db.swuseremails.belongsTo(db.swusers, {foreignKey: 'linktypeid'})
  db.tokens.belongsTo(db.swuseremails, {foreignKey: 'userId'})

  db.swtickets.hasMany(db.swticketposts, {foreignKey: 'ticketid'})
  db.swuserorganizations.hasMany(db.swusers, {foreignKey: 'userorganizationid'})
  db.swtickets.hasMany(db.swattachments, {foreignKey: 'ticketid'})
  db.swtickets.belongsTo(db.swdepartments, {foreignKey: 'departmentid'})
  db.swtickets.belongsTo(db.swusers, {foreignKey: 'userid'})
  db.swtickets.belongsTo(db.swtickettypes, {foreignKey: 'tickettype'})
  db.swtickets.belongsTo(db.swticketstatus, {foreignKey: 'ticketstatusid'})
  db.swtickets.belongsTo(db.swticketpriorities, {foreignKey: 'priorityid'})
  db.swtickets.belongsTo(db.swcustomfieldvalues, {targetKey: 'typeid', foreignKey: 'ticketid'})
  db.swticketposts.belongsTo(db.swusers, {foreignKey: 'userid'})
  db.swkbarticledata.belongsTo(db.swkbarticles, {foreignKey: 'kbarticleid'})
  db.swkbarticles.hasOne(db.swkbarticledata, {foreignKey: 'kbarticleid'})
  /*db.swuseremails.findOne({
    where: {email: 'techsup@hikom.ru'},
    include: [{model: db.swusers}],
    logging: console.log
  })
    .then(email => {
      console.log(email.swuser)
    })*/

}
