const passport = require('../passport');
const moment = require("moment/moment");
const XLSX = require('sheetjs-style');
const fs = require('fs')
const mongoose = require("mongoose");
module.exports = function (app) {
    const {db} = app.locals;
    const population = [
        {path: 'configurations', populate: db.configuration.population},
        {path: 'shared', select: {email: 1}}
    ]

    const specToXls = (spec, user) => {
        const rows = [
            ["Артикул", "К-во", "Название", "РРЦ, Руб.", "РРЦ стоимость, Руб.", "Скидка, %", "Цена, Руб.", "Стоимость, Руб."]
        ];
        const rowHeights = [{hpx: 30}, {hpx: 30}]
        const confStyle = {
            font: {bold: false},
            alignment: {
                vertical: 'center',
                wrapText: '1',
            }
        }
        const partStyle = {font: {color: {rgb: '00999999'}}}

        for (const conf of spec.configurations) {
            rowHeights.push({hpx: 50})
            const partRows = []

            for (const part of conf.partsSorted) {
                if (user.email.match('qtech.ru') || user.email.match('tdtel.ru')) {
                    rowHeights.push({hpx: 15})
                    partRows.push([
                        {v: part.component.partNumber, s: {alignment: {horizontal: 'right'}, ...partStyle}},
                        {v: part.count, t: 'n', s: {alignment: {horizontal: 'center'}, ...partStyle}},
                        {v: part.component.description, s: partStyle},
                        {v: part.component.price, t: 'n', s: partStyle, z: '0.00'},
                        {v: part.price, t: 'n', s: partStyle, z: '0.00'}
                    ])
                }
            }
            const styleConfCount = JSON.parse(JSON.stringify(confStyle))
            styleConfCount.alignment.horizontal = 'center'
            const confRow = [
                {v: conf.chassis.partNumber, s: confStyle},
                {v: conf.count, t: 'n', s: styleConfCount},
                {v: conf.description, s: confStyle},
                {v: conf.price, t: 'n', s: confStyle, z: '0.00'},
                {v: conf.priceTotal, t: 'n', s: confStyle},
                {v: 0, t: 'n', s: confStyle},
                {v: conf.price, t: 'n', s: confStyle},
                {v: conf.priceTotal, t: 'n', s: confStyle}
            ]
            rows.push(confRow)
            if (conf.service) {
                rows.push([
                    {v: conf.service.article},
                    {v: conf.count, t: 'n', s: styleConfCount},
                    {v: conf.service.name},
                    {v: conf.priceService, t: 'n'},
                    {v: conf.priceService * conf.count, t: 'n'}
                ])
            }
            rows.push(...partRows)
        }


        const ws = XLSX.utils.json_to_sheet(rows);

        //if(!ws["!merges"]) ws["!merges"] = [];
        //ws["!merges"].push(XLSX.utils.decode_range("A1:E1"))
        //XLSX.utils.sheet_add_aoa(ws, [["Артикул", "К-во", "Название", "РРЦ, Руб.", "РРЦ стоимость, Руб.", "Скидка, %", "Цена, Руб.", "Стоимость, Руб."]], {origin: "A2"});
        XLSX.utils.sheet_add_aoa(ws, [["QTECH.RU", "", spec.name, "", moment().format('YYYY-MM-DD'), "", "", ""]], {origin: "A1"});
        const headStyle = {
            alignment: {
                vertical: 'center'
            },
            fill: {
                fgColor: {
                    rgb: "00a92238"
                }
            },
            font: {
                color: {
                    rgb: 'FFFFFFFF'
                },
                bold: true,
            },
        }
        ws.A2.s = headStyle
        ws.B2.s = headStyle
        ws.C2.s = headStyle
        ws.D2.s = headStyle
        ws.E2.s = headStyle
        ws.F2.s = headStyle
        ws.G2.s = headStyle
        ws.H2.s = headStyle
        ws['!rows'] = rowHeights
        ws['!cols'] = [{wch: 30}, {wch: 10}, {wch: 60}, {wch: 12}, {wch: 10}, {wch: 12}, {wch: 15}, {wch: 15}]
        //console.log(ws)
        const wb = {Sheets: {'data': ws}, SheetNames: ['data']};
        const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
        return Buffer.from(excelBuffer)
    }

    //db.chassis.findOne().then(console.log)
    /*
        db.spec.findOne()
            .sort({createdAt: - 1})
            .populate({path: 'configurations', populate: db.configuration.population})
            .then(s=> {
                console.log(s.configurations[0].parts)
            })
    */
    if (0) db.spec.findById('637620fa5fd86f390582947e')
        .populate(population)
        .then(spec => {
            const data = specToXls(spec)
            fs.writeFile("test.xls", data, 'base64', function (err) {
                const workbook = XLSX.readFile('test.xls');
                const sheet_name_list = workbook.SheetNames;
                const items = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
                //console.log(items);
            })
        })

    app.post('/api/spec/:_id/share', passport.isLogged, async (req, res) => {
        try {
            const {user} = res.locals;
            const {_id} = req.params;
            const emails = req.body;
            const spec = await db.spec.findOne({_id, user}).populate(population);
            if (!spec) res.sendStatus(404)
            const users = await db.user.find({email: {$in: emails}})
            const found = []
            for (const u of users) {
                found.push(u.email)
                spec._id = mongoose.Types.ObjectId();
                spec.user = u
                spec.shared = user
                spec.isNew = true;
                const newConfigs = []
                for (const conf of spec.configurations) {
                    conf._id = mongoose.Types.ObjectId();
                    conf.user = u
                    conf.isNew = true;
                    await conf.save()
                    newConfigs.push(conf._id)
                }
                spec.configurations = newConfigs
                await spec.save()
            }
            res.send(found)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

    app.get('/api/spec/:_id/configuration/:configurationId/copy', passport.isLogged, async (req, res) => {
        try {
            const {user} = res.locals;
            const {_id, configurationId} = req.params;
            const spec = await db.spec.findOne({_id, user});
            const item = await db.configuration.findOne({_id: configurationId, user}).populate(db.configuration.population);
            if (!item) throw {error: 403, message: 'Access denied'}
            item._id = mongoose.Types.ObjectId();
            item.name = 'Копия ' + item.name
            item.isNew = true;
            await item.save()
            for (const part of item.parts) {
                part._id = mongoose.Types.ObjectId();
                part.configuration = item._id;
                part.isNew = true;
                await part.save()
            }
            spec.configurations.push(item.id)
            await spec.save()
            res.sendStatus(200)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })


    app.get('/api/spec/:_id/excel', passport.isLogged, async (req, res) => {
        const {user} = res.locals;
        const {_id, configurationId} = req.params;
        const spec = await db.spec.findOne({_id, user}).populate(population);
        if (!spec) res.sendStatus(404)
        res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        res.setHeader("Content-Disposition", "attachment; filename=" + encodeURIComponent(spec.name) + ".xlsx");
        res.send(specToXls(spec, user))
    })

    app.get('/api/specs', passport.isLogged, async (req, res) => {
        const {user} = res.locals;
        const item = await db.spec.find({user})
            .sort({createdAt: 'desc'})
            .populate(population);
        res.send(item)
    })

    app.put('/api/spec/:_id/rename', passport.isLogged, async (req, res) => {
        try {
            const {user} = res.locals;
            const {_id, configurationId} = req.params;
            const {name} = req.body;
            const spec = await db.spec.findOne({_id, user});
            if (!spec) res.sendStatus(404)
            spec.name = name;
            await spec.save();
            res.sendStatus(200)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
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
            } else {
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

    app.put('/api/spec/:_id/chassis/:chassis/add', passport.isLogged, async (req, res) => {
        try {
            const {user} = res.locals;
            const {_id, chassis} = req.params;
            const spec = await db.spec.findOne({_id, user});

            if (!spec) res.sendStatus(404)
            const configuration = await db.configuration.create({
                chassis,
                user,
                name: 'Конфигурация от ' + moment().format('YYYY-MM-DD HH:mm')
            })
            await configuration.populate(db.configuration.population);
            spec.configurations.push(configuration.id);
            await spec.save();
            return res.send(configuration)
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
            const spec = await db.spec.findOne({_id, user}).populate(population);
            res.send(spec)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

    app.post('/api/spec/delete', passport.isLogged, async (req, res) => {
        try {
            const {user} = res.locals;
            const specs = await db.spec.find({_id: {$in: req.body}, user}).populate(population);
            for (const spec of specs) {
                await spec.delete()
            }
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
