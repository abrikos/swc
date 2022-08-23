const passport = require('../passport');
const sequelize = require("sequelize");
const md5 = require("md5");
const moment = require("moment/moment");

module.exports = function (app){
  const {db} = app.locals;

  app.post('/api/auth/login',  passport.authenticate)

  app.post('/api/auth/signup',  async (req, res) => {
    const {email, password} = req.body
    const user = await db.swusers.create({userpassword: password})
    const e = await db.swuseremails.create({email, linktypeid: user.userid})
    res.sendStatus(200);
  })

  app.get('/logout',  async (req, res) => {
    const {user} = res.locals;
    const post = await db.swusers.findByPk(14)
    res.send({z:1});
  })

  app.post('/api/auth/logout', passport.logout);


  app.post('/api/auth/user', passport.isLogged,  async (req, res) => {
    const {user} = res.locals;
    res.send(user)
  })

  app.get('/test', passport.isLogged,  async (req, res) => {
    const {user} = res.locals;
    const post = await db.swusers.findByPk(14)
    res.send({z:1});
  })

}
