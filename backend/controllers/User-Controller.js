const passport = require('../passport');

module.exports = function (app){
  const {db} = app.locals;
  app.post('/api/auth/login',  async (req, res) => {
    const {email, password} = req.body
    const user = await db.swuseremails.findOne({
      where: {email},
      include: [{model: db.swusers}],
      //logging: console.log
    })

    if(passport.checkPassword(password, user.swuser.userpassword)){
      res.send({z:1});
    }else{
      res.sendStatus(401);
    }

  })

  app.get('/api/registration',  async (req, res) => {
    const {email, password} = req.body
    const user = await db.swusers.create({userpassword: passport.hashPassword(password)})
    const e = await db.swuseremails.create({email, linktypeid: user.userid})
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
