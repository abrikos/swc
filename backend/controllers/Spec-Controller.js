const passport = require('../passport');
const moment = require("moment/moment");

module.exports = function (app) {
    const {db} = app.locals;

    app.get('/api/specs', passport.isLogged, async (req, res) => {
        const {user} = res.locals;
        const item = await db.spec.find({user})
            .sort({createdAt: 'desc'})
            .populate({path: 'configurations', populate: db.configuration.population});
        res.send(item)
    })

    app.put('/api/spec/create', passport.isLogged, async (req, res) => {
        try {
            const {user} = res.locals;
            const configurations = []

            for (const _id of req.body) {
                const conf = await db.configuration.findOne({_id, user}).populate(db.configuration.population);

                if (conf) {
                    configurations.push(conf)
                }
            }
            if (configurations.length) {
                await db.spec.create({name: 'Спецификация от ' + moment().format('YYYY-MM-DD HH:mm'), user, configurations});
            }
            res.sendStatus(200)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

    app.delete('/api/spec/:_id/configurations/:configurationId/remove', passport.isLogged, async (req, res) => {
        try {
            const {user} = res.locals;
            const {_id, configurationId} = req.params;
            const spec = await db.spec.findOne({_id, user});
            if (!spec) res.sendStatus(404)
            spec.configurations = spec.configurations.filter(c=>c._id.toString() !== configurationId);
            await spec.save();
            res.sendStatus(200)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }

    })

    app.put('/api/spec/:_id/configurations/add', passport.isLogged, async (req, res) => {
        try {
            const {user} = res.locals;
            const {_id} = req.params;
            const spec = await db.spec.findOne({_id, user});
            if (!spec) res.sendStatus(404)
            const configurations = []
            for (const _id of req.body) {
                const conf = await db.configuration.findOne({_id, user}).populate(db.configuration.population);
                if (conf) {
                    configurations.push(conf.id)
                }
            }
            spec.configurations.push(configurations);
            await spec.save();
            res.sendStatus(200)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

    app.put('/api/spec/:_id/configuration/:configurationId', passport.isLogged, async (req, res) => {
        try {
            const {user} = res.locals;
            const {_id, configurationId} = req.params
            const configuration = await db.configuration.findOne({_id: configurationId, user}).populate(db.configuration.population);
            const spec = await db.spec.findOne({_id, user});
            if (!spec) throw {error: 403, message: 'Access denied: wrong spec'}
            if (spec.configurations.includes(configuration.id)) throw {error: 406, message: 'configuration already in this spec'}
            spec.configurations.push(configuration)
            await spec.save()
            res.sendStatus(200)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })


    app.get('/api/spec/:_id', passport.isLogged, async (req, res) => {
        try {
            const {user} = res.locals;
            const {_id} = req.params
            const spec = await db.spec.findOne({_id, user}).populate({path: 'configurations', populate: db.configuration.population});
            res.send(spec)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

    app.delete('/api/spec/:id', passport.isLogged, async (req, res) => {
        try {
            const {user} = res.locals;
            const {id} = req.params
            const spec = await db.spec.findOne({_id: id, user}).populate({path: 'configurations', populate: db.configuration.population});
            if (!spec) throw {error: 403, message: 'Access denied'}
            await spec.delete()
            res.sendStatus(200)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

    app.delete('/api/spec/:specId/configuration/:configurationId/remove', passport.isLogged, async (req, res) => {
        try {
            const {user} = res.locals;
            const {specId, configurationId} = req.params;
            const spec = await db.spec.findOne({_id: specId, user});
            if (!spec) throw {error: 403, message: 'Access denied'}
            spec.configurations = spec.configurations.filter(a => a._id.valueOf() !== configurationId)
            await spec.save()
            res.sendStatus(200)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

}
