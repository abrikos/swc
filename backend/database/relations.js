module.exports = (db) => {
  db.swusers.hasMany(db.swuseremails, {foreignKey: 'linktypeid'})
  db.swuseremails.hasMany(db.tokens, {foreignKey: 'userId'})
  db.swuseremails.belongsTo(db.swusers, {foreignKey: 'linktypeid'})
  db.tokens.belongsTo(db.swuseremails, {foreignKey: 'userId'})

  db.swtickets.hasMany(db.swticketposts, {foreignKey: 'ticketid'})
  db.swtickets.hasMany(db.swattachments, {foreignKey: 'ticketid'})
  db.swtickets.belongsTo(db.swdepartments, {foreignKey: 'departmentid'})
  /*db.swuseremails.findOne({
    where: {email: 'techsup@hikom.ru'},
    include: [{model: db.swusers}],
    logging: console.log
  })
    .then(email => {
      console.log(email.swuser)
    })*/

}
