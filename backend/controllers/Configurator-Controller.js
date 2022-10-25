const passport = require('../passport');

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

    app.get('/api/configurator/chassis', async (req, res) => {
        const list = await db.chassis.find();
        res.send(list)
    })

    app.get('/api/configurator/assembly/:assemblyId', passport.isLogged, async (req, res) => {
        const {user} = res.locals;
        const {assemblyId} = req.params;
        const item = await db.assembly.findOne({_id: assemblyId, user}).populate('components').populate('chassis');
        res.send(item)
    })

    //db.assembly.deleteMany({}).then(console.log)
    app.get('/api/configurator/create/assembly/:chassis', passport.isLogged, async (req, res) => {
        const {user} = res.locals;
        const assembly = await db.assembly.create({chassis: req.params.chassis, user});
        res.send(assembly)
    })

    app.put('/api/configurator/assembly/:assemblyId/add/:componentId', passport.isLogged, async (req, res) => {
        try {
            const {user} = res.locals;
            const {assemblyId, componentId} = req.params;
            const assembly = await db.assembly.findOne({_id: assemblyId, user});
            if (!assembly) throw {message: 'Wrong assembly'}
            if (assembly.components.includes(componentId)) {
                assembly.components = assembly.components.filter(c => !c.equals(componentId));
            } else {
                assembly.components.push(componentId);
            }

            await assembly.save()
            res.sendStatus(200)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })


}
