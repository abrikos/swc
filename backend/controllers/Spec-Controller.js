const passport = require('../passport');
const moment = require("moment/moment");
const XLSX = require('xlsx');
const fs = require('fs')
module.exports = function (app) {
    const {db} = app.locals;
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const specToXls = (spec) => {
        const rows = [];
        rows.push({name: spec.name})
        rows.push({name: 'Сумма спецификации', price: spec.price})
        for(const conf of spec.configurations){
            rows.push({name: conf.name, price: conf.price})
            rows.push({name:'', price:'', partNumber: conf.chassis.partNumber, partCount: conf.count, partPrice: conf.chassis.price})
            for(const part of conf.parts){
                rows.push({name:'', price:'', partNumber: part.component.partNumber, partCount: part.count, partPrice: part.component.price})
            }
        }
        const ws = XLSX.utils.json_to_sheet(rows);
        //if(!ws["!merges"]) ws["!merges"] = [];
        //ws["!merges"].push(XLSX.utils.decode_range("A1:E1"))
        XLSX.utils.sheet_add_aoa(ws, [["Название", "Цена", "PN", "Количество", "Цена"]], { origin: "A1" });
        const wb = {Sheets: {'data': ws}, SheetNames: ['data']};
        const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
        return Buffer.from(excelBuffer)
    }


    /*db.spec.findById('63707c9ca32339f54a5cf167')
        .populate({path: 'configurations', populate: db.configuration.population})
        .then(spec => {
            const data = specToXls(spec)
            fs.writeFile("test.xls", data, 'base64', function (err) {
                const workbook = XLSX.readFile('test.xls');
                const sheet_name_list = workbook.SheetNames;
                const items = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
                console.log(items);
            })
        })*/



    app.get('/api/spec/:_id/excel', passport.isLogged, async (req, res) => {
        const {user} = res.locals;
        const {_id, configurationId} = req.params;
        const spec = await db.spec.findOne({_id, user}).populate({path: 'configurations', populate: db.configuration.population});
        if (!spec) res.sendStatus(404)
        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader("Content-Disposition", "attachment; filename=" + encodeURIComponent(spec.name) + ".xlsx");
        res.send(specToXls(spec))
    })

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
                const spec = await db.spec.create({name: 'Спецификация от ' + moment().format('YYYY-MM-DD HH:mm'), user, configurations});
                res.send(spec)
            }else{
                res.sendStatus(406)
            }

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
            spec.configurations = spec.configurations.filter(c => c._id.toString() !== configurationId);
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
            console.log(spec.configurations)
            spec.configurations.push(...configurations);
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
