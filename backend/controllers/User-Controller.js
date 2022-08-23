const passport = require('../passport');

module.exports = function (app){
  const {db} = app.locals;

  app.get('/login',  async (req, res) => {
    const {user} = res.locals;
    const post = await db.swusers.findByPk(14)
    res.send({z:1});
  })

  app.get('/logout',  async (req, res) => {
    const {user} = res.locals;
    const post = await db.swusers.findByPk(14)
    res.send({z:1});
  })

  app.get('/user/:id', passport.isLogged,  async (req, res) => {
    const {user} = res.locals;
    const post = await db.swusers.findByPk(14)
    res.send({z:1});
  })

  app.get('/test', passport.isLogged,  async (req, res) => {
    const {user} = res.locals;
    const post = await db.swusers.findByPk(14)
    res.send({z:1});
  })

}
