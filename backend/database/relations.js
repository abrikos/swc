module.exports = (db) =>{
  db.swusers.hasMany(db.swuseremails, {foreignKey:'linktypeid', as: 'emails'})
//db.swuseremails.hasMany(db.swusers, {targetKey:'linktypeid'})

  db.swusers.findByPk(14, {include:[{model: db.swuseremails, as: 'emails'}]})
    .then(u=>{
      u.emails.forEach(e=>console.log(e.email))
    })

}
