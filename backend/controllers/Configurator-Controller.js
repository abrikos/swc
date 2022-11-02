const passport = require('../passport');
const moment = require("moment/moment");

module.exports = function (app) {
    const {db} = app.locals;
    app.get('/api/components/:type', async (req, res) => {
        const list = await db.component.find({type: req.params.type});
        res.send(list)
    })

    app.get('/api/components', async (req, res) => {
        const list = await db.component.find();
        res.send(list)
    })

    app.get('/api/configurator/chassis/:platform', async (req, res) => {
        const {platform} = req.params
        const list = await db.chassis.find({platform});
        res.send(list)
    })

    app.get('/api/configurator/specs', passport.isLogged, async (req, res) => {
        const {user} = res.locals;
        const item = await db.spec.find({user}).populate({path:'configuration', populate:db.configuration.population});
        res.send(item)
    })

}
