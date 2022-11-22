const passport = require('../passport');
const moment = require("moment/moment");
const XLSX = require('sheetjs-style');
const fs = require('fs')
const mongoose = require("mongoose");
module.exports = function (app) {
    const {db} = app.locals;

    const specToXls = (spec) => {
        const rows = [];
        const rowHeights = [{hpx: 30}]
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
            let confName = [conf.chassis.params]
            for (const part of conf.partsSorted) {
                rowHeights.push({hpx: 15})
                confName.push(part.component.description + '*' + part.count)
                partRows.push([
                    {v: part.component.partNumber, s: {alignment: {horizontal: 'right'}, ...partStyle}},
                    {v: part.count, t: 'n', s: {alignment: {horizontal: 'center'}, ...partStyle}},
                    {v: part.component.description, s: partStyle},
                    {v: part.component.price, t: 'n', s: partStyle},
                    {v: part.price, t: 'n', s: partStyle}
                ])
            }
            const styleConfCount = JSON.parse(JSON.stringify(confStyle))
            styleConfCount.alignment.horizontal = 'center'
            console.log(confStyle)
            const confRow = [
                {v: conf.chassis.partNumber, s: confStyle},
                {v: conf.count, t: 'n', s: styleConfCount},
                {v: confName.join(', '), s: confStyle},
                {v: conf.price, t: 'n', s: confStyle},
                {v: conf.priceTotal, t: 'n', s: confStyle}
            ]
            rows.push(confRow)
            rows.push(...partRows)
        }

        const ws = XLSX.utils.json_to_sheet(rows);

        //if(!ws["!merges"]) ws["!merges"] = [];
        //ws["!merges"].push(XLSX.utils.decode_range("A1:E1"))
        XLSX.utils.sheet_add_aoa(ws, [["PartNumber", "К-во", "Название", "Стоимость, $", "Цена, $"]], {origin: "A1"});
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
        ws.A1.s = headStyle
        ws.B1.s = headStyle
        ws.C1.s = headStyle
        ws.D1.s = headStyle
        ws.E1.s = headStyle
        ws['!rows'] = rowHeights
        ws['!cols'] = [{wch: 30}, {wch: 10}, {wch: 60}, {wch: 12}, {wch: 10}]
        //console.log(ws)
        const wb = {Sheets: {'data': ws}, SheetNames: ['data']};
        const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
        return Buffer.from(excelBuffer)
    }
    /*
        db.spec.findOne()
            .sort({createdAt: - 1})
            .populate({path: 'configurations', populate: db.configuration.population})
            .then(s=> {
                console.log(s.configurations[0].parts)
            })
    */
    if (0) db.spec.findById('637620fa5fd86f390582947e')
        .populate({path: 'configurations', populate: db.configuration.population})
        .then(spec => {
            const data = specToXls(spec)
            fs.writeFile("test.xls", data, 'base64', function (err) {
                const workbook = XLSX.readFile('test.xls');
                const sheet_name_list = workbook.SheetNames;
                const items = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
                //console.log(items);
            })
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
            const spec = await db.spec.findOne({_id, user}).populate({path: 'configurations', populate: db.configuration.population});
            res.send(spec)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

    app.post('/api/spec/delete', passport.isLogged, async (req, res) => {
        try {
            const {user} = res.locals;
            const specs = await db.spec.find({_id: {$in: req.body}, user}).populate({path: 'configurations', populate: db.configuration.population});
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
