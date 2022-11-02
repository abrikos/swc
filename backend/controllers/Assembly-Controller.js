const passport = require('../passport');
const moment = require("moment/moment");

module.exports = function (app) {
    const {db} = app.locals;
    app.get('/api/assemblies/my', passport.isLogged, async (req, res) => {
        const {user} = res.locals;
        const items = await db.assembly.find({user}).sort({createdAt: 'desc'}).populate(db.assembly.population)
        res.send(items)
    })

    app.put('/api/assembly/:assemblyId/to-spec/:specId', passport.isLogged, async (req, res) => {
        try {
            const {user} = res.locals;
            const {assemblyId, specId} = req.params;
            const assembly = await db.assembly.findOne({_id: assemblyId, user}).populate(db.assembly.population);
            if (!assembly) throw {error: 403, message: 'Access denied: wrong assembly'}
            const spec = await db.spec.findOne({_id: specId, user});
            if (!spec) throw {error: 403, message: 'Access denied: wrong spec'}
            if (spec.assemblies.includes(assembly.id)) throw {error: 406, message: 'Assembly already in this spec'}
            spec.assemblies.push(assembly)
            await spec.save()
            res.sendStatus(200)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

    app.delete('/api/assembly/:assemblyId', passport.isLogged, async (req, res) => {
        try {
            const {user} = res.locals;
            const {assemblyId} = req.params;
            const item = await db.assembly.findOne({_id: assemblyId, user}).populate(db.assembly.population);
            if (!item) throw {error: 403, message: 'Access denied'}
            await item.delete()
            res.sendStatus(200)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

    app.get('/api/assembly/:assemblyId', passport.isLogged, async (req, res) => {
        const {user} = res.locals;
        const {assemblyId} = req.params;
        const assembly = await db.assembly.findOne({_id: assemblyId, user}).populate(db.assembly.population);
        res.send({assembly, ...await componentsOfAssembly(assembly)})
    })


    //db.chassis.find({}).then(console.log)
    async function componentsOfAssembly(assembly) {
        const criteria = {type: {$in: []}}
        const tabs = !['JBOD'].includes(assembly.chassis.platform) ? [
            //{id: 'base', label: 'Основа'},
            {type: 'Memory',},
            {type: 'CPU'},

            {
                type: 'Storage',
                children: [
                    {type: 'RAID'},
                    {type: 'HDD'},
                    {type: 'SSD 2.5'},
                    {type: 'SSD m.2'},
                    {type: 'SSD U.2 NVMe'},
                    {type: 'Rear bay'},
                ]
            },
            {type: 'Riser',},
            {
                type: 'PCI-E',
                children: [
                    {type: 'LAN OCP 3.0'},
                    {type: 'LAN'},
                    {type: 'FC'},
                    {type: 'GPU'},
                    {type: 'Transceiver'},
                ]
            },
            {type: 'Power'},
        ] : [{type: 'Cable'}]
        for (const tab of tabs) {
            if (tab.children) {
                for (const subTab of tab.children) {
                    criteria.type.$in.push(subTab.type)
                }
            } else {

                if (tab.type === 'CPU') {
                    criteria.type.$in.push(assembly.chassis.platform === 'AMD' ? 'AMD' : 'Intel')
                } else {
                    criteria.type.$in.push(tab.type)
                }
            }
        }
        return {components: await db.component.find(criteria), tabs};
    }

    app.get('/api/assembly/:assemblyId/component-type/:componentType', async (req, res) => {
        const {assemblyId, componentType} = req.params;
        const assembly = await db.assembly.findById(assemblyId).populate(db.assembly.population);
        res.send(await componentsOfAssembly(assembly, componentType))
    })


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

    app.delete('/api/assembly/part/:partId', passport.isLogged, async (req, res) => {
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

    app.put('/api/assembly/:assemblyId/component/:componentId', passport.isLogged, async (req, res) => {
        try {
            const {user} = res.locals;
            const {componentId, assemblyId} = req.params;
            const {count} = req.body;
            const assembly = await db.assembly.findById(assemblyId).populate(db.assembly.population);
            if (!assembly.user.equals(user.id)) throw {error: 403, message: 'Access denied'}
            const component = await db.component.findById(componentId);
            if (!component) throw {message: 'Wrong component'}
            if (count)
                await db.part.updateOne({component, assembly}, {count}, {upsert: true})
            else
                await db.part.deleteOne({component, assembly})
            res.sendStatus(200)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }

    });

    app.put('/api/assembly/:assemblyId/field/:field', passport.isLogged, async (req, res) => {
        const {user} = res.locals;
        const {assemblyId, field} = req.params;
        const assembly = await db.assembly.findOne({_id: assemblyId, user}).populate(db.assembly.population);
        if (!assembly) throw {message: 'Wrong assembly'}
        assembly[field] = req.body[field]
        await assembly.save()
        res.sendStatus(200)
    })

}
