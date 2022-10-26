const passport = require('../passport');
const moment = require("moment/moment");

module.exports = function (app) {
    const {db} = app.locals;

    app.get('/api/specs', passport.isLogged, async (req, res) => {
        const {user} = res.locals;
        const item = await db.spec.find({user}).populate({path: 'assemblies', populate: db.assembly.population});
        res.send(item)
    })

    app.put('/api/spec/create', passport.isLogged, async (req, res) => {
        try {
            const {user} = res.locals;
            const {name, assembly} = req.body;
            if (!name) throw {error: 406, message: 'Name required'}
            await db.spec.create({name, user, assemblies: [assembly]});
            res.sendStatus(200)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })
    app.delete('/api/spec/:specId/assembly/:assemblyId/remove', passport.isLogged, async (req, res) => {
        try {
            const {user} = res.locals;
            const {specId, assemblyId} = req.params;
            const spec = await db.spec.findOne({_id: specId, user});
            if(!spec) throw {error:403, message: 'Access denied'}
            spec.assemblies = spec.assemblies.filter(a => a._id.valueOf() !== assemblyId)
            await spec.save()
            res.sendStatus(200)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

}
