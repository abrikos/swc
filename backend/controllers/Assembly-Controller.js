const passport = require('../passport');
const moment = require("moment/moment");

module.exports = function (app) {
    const {db} = app.locals;
    app.get('/api/assemblies/my', passport.isLogged, async (req, res) => {
        const {user} = res.locals;
        const items = await db.assembly.find({user}).populate(db.assembly.population)
        res.send(items)
    })

    app.get('/api/assembly/:assemblyId', passport.isLogged, async (req, res) => {
        const {user} = res.locals;
        const {assemblyId} = req.params;
        const item = await db.assembly.findOne({_id: assemblyId, user}).populate(db.assembly.population);
        res.send(item)
    })

    app.delete('/api/assembly/:assemblyId', passport.isLogged, async (req, res) => {
        try {
            const {user} = res.locals;
            const {assemblyId} = req.params;
            const item = await db.assembly.findOne({_id: assemblyId, user}).populate(db.assembly.population);
            if (!item) throw {error: 403, message: 'Access denied'}
            await item.delete()
            res.sendStatus(200)
        }catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

    app.get('/api/assembly/:assemblyId/component-type/:componentType', async (req, res) => {
        const {assemblyId, componentType} = req.params;
        const assembly = await db.assembly.findById(assemblyId).populate(db.assembly.population);
        const criteria = {type: componentType}
        if (componentType === 'CPU') {
            criteria.type = assembly.chassis.platform === 'AMD' ? 'AMD' : 'Intel'
        }
        const items = await db.component.find(criteria);
        res.send(items)
    })

    //db.assembly.deleteMany({}).then(console.log)
    app.get('/api/assembly/create/chassis/:chassis', passport.isLogged, async (req, res) => {
        const {user} = res.locals;
        const assembly = await db.assembly.create({
            chassis: req.params.chassis,
            user,
            name: 'Сборка от ' + moment().format('YYYY-MM-DD HH:mm')
        })
        await assembly.populate(db.assembly.population);
        res.send(assembly)
    })

    app.delete('/api/assembly/part/:partId/remove', passport.isLogged, async (req, res) => {
        try {
            const {user} = res.locals;
            const part = await db.part.findById(req.params.partId);
            if (!part) throw {error: 404, message: 'Wrong Part id'}
            const assembly = await db.assembly.findById(part.assembly).populate(db.assembly.population);
            if (!assembly.user.equals(user.id)) throw {error: 403, message: 'Access denied'}
            await part.delete()
            res.sendStatus(200)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

    app.put('/api/assembly/:assemblyId/field/:field', passport.isLogged, async (req, res) => {
        const {user} = res.locals;
        const {assemblyId, field} = req.params;
        const assembly = await db.assembly.findOne({_id: assemblyId, user}).populate(db.assembly.population);
        if (!assembly) throw {message: 'Wrong assembly'}
        assembly[field] = req.body[field]
        await assembly.save()
        res.sendStatus(200)
    })

    app.put('/api/assembly/:assemblyId/add/component/:componentId', passport.isLogged, async (req, res) => {
        try {
            const {user} = res.locals;
            const {assemblyId, componentId} = req.params;
            const {count} = req.body
            const assembly = await db.assembly.findOne({_id: assemblyId, user}).populate(db.assembly.population);
            if (!assembly) throw {message: 'Wrong assembly'}
            const component = await db.component.findById(componentId);
            if (!component) throw {message: 'Wrong component'}
            const part = await db.part.findOne({assembly, component}).populate('component')
            if (!part) {
                db.part.create({assembly, component, count})
            } else {
                part.count = count
                await part.save()
            }
            res.sendStatus(200)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })


}
