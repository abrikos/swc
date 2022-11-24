const passport = require('../passport');
const moment = require("moment/moment");
const mongoose = require('mongoose')

module.exports = function (app) {
    const {db} = app.locals;
    app.get('/api/configuration/chassis', async (req, res) => {
        const list = await db.chassis.find();
        res.send(list)
    })


    app.get('/api/configuration/my', passport.isLogged, async (req, res) => {
        try {
            const {user} = res.locals;
            const items = await db.configuration.find({user}).sort({createdAt: 'desc'}).populate(db.configuration.population)
            res.send(items)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

    app.delete('/api/configuration/:configurationId', passport.isLogged, async (req, res) => {
        try {
            const {user} = res.locals;
            const {configurationId} = req.params;
            const item = await db.configuration.findOne({_id: configurationId, user}).populate(db.configuration.population);
            if (!item) throw {error: 403, message: 'Access denied'}
            await item.delete()
            res.sendStatus(200)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

    app.get('/api/configuration/:configurationId', passport.isLogged, async (req, res) => {
        try {
            const {user} = res.locals;
            const {configurationId} = req.params;
            const configuration = await db.configuration.findOne({_id: configurationId, user}).populate(db.configuration.population);
            if (!configuration) res.sendStatus(404)
            const tabs = !['JBOD'].includes(configuration.chassis.platform) ? [
                //{id: 'base', label: 'Основа'},

                {category: 'CPU'},
                {category: 'Memory',},
                {
                    category: 'Storage',
                    children: [
                        {type: 'RAID'},
                        {type: 'HDD'},
                        {type: 'SSD 2.5'},
                        {type: 'SSD m.2'},
                        {type: 'SSD U.2 NVMe'},
                        {type: 'Rear bay'},

                    ]
                },
                {category: 'Riser',},
                {
                    category: 'PCI-E',
                    children: [
                        {type: 'LAN OCP 3.0'},
                        {type: 'LAN'},
                        {type: 'FC'},
                        {type: 'GPU'},
                        {type: 'Transceiver'},
                    ]
                },
                {category: 'Power'},
            ] : [{category: 'Cable'}]
            const components = await db.component.find().sort({partNumber: 1})
            const specs = (await db.spec.find()).filter(s => s.configurations.includes(configurationId));
            res.send({configuration, tabs, components, specs})
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

    //db.spec.find().then(c=>console.log(c))


    app.get('/api/configuration/create/chassis/:chassis', passport.isLogged, async (req, res) => {
        try {
            const {user} = res.locals;
            const {chassis} = req.params;
            const configuration = await db.configuration.create({
                chassis,
                user,
                name: 'Конфигурация от ' + moment().format('YYYY-MM-DD HH:mm')
            })
            await configuration.populate(db.configuration.population);
            const partNumber = configuration.chassis.units === 1 ? 'x16riser1U' : '3x8riser2U'
            const component = await db.component.findOne({partNumber})
            await db.part.create({component, configuration, count: 1})
            await db.spec.create({name: 'Спецификация от ' + moment().format('YYYY-MM-DD HH:mm'), user, configurations: [configuration]});

            res.send(configuration)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

    app.delete('/api/configuration/part/:partId', passport.isLogged, async (req, res) => {
        try {
            const {user} = res.locals;
            const part = await db.part.findById(req.params.partId);
            if (!part) throw {error: 404, message: 'Wrong Part id'}
            const configuration = await db.configuration.findById(part.configuration).populate(db.configuration.population);
            if (!configuration.user.equals(user.id)) throw {error: 403, message: 'Access denied'}
            await part.delete()
            res.sendStatus(200)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

    app.put('/api/configuration/:configurationId/component/:componentId', passport.isLogged, async (req, res) => {
        try {
            const {user} = res.locals;
            const {componentId, configurationId} = req.params;
            const {count} = req.body;
            const configuration = await db.configuration.findById(configurationId).populate(db.configuration.population);
            if (!configuration.user.equals(user.id)) throw {error: 403, message: 'Access denied'}
            const component = await db.component.findById(componentId);
            if (!component) throw {error: 406, message: 'Wrong component'}
            if (count)
                await db.part.updateOne({component, configuration}, {count}, {upsert: true})
            else
                await db.part.deleteOne({component, configuration})
            res.sendStatus(200)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }

    });

    app.put('/api/configuration/:configurationId/field/:field', passport.isLogged, async (req, res) => {
        try {
            const {user} = res.locals;
            const {configurationId, field} = req.params;
            const configuration = await db.configuration.findOne({_id: configurationId, user}).populate(db.configuration.population);
            if (!configuration) throw {message: 'Wrong configuration'}
            configuration[field] = req.body[field]
            await configuration.save()
            res.sendStatus(200)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

}
