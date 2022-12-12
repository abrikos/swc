const passport = require('../passport');
const fs = require('fs');
const csv = require('csv-parser')
const clc = require("cli-color");
const XLSX = require('xlsx');
const sharp = require('sharp');
const moment = require("moment");
module.exports = function (app) {
    const {db} = app.locals;

    setInterval(async () => {
        const days = 30
        const blockFromDate = moment().unix() - 3600 * 24 * days
        const where = {$and: [{email: {$ne: process.env.ADMIN_EMAIL}}, {blocked: false}, {logged: {$lt: blockFromDate}}]}
        db.user.updateMany(where, {blocked: true})
            .then(console.log)
    }, 3600 * 1000 * 24)

    setInterval(()=>{
        db.part.deleteMany({component:null}).then(()=>{})
    }, 10000)

    async function initAdmin() {
        //await db.user.deleteMany().then(console.log)
        if (!(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSW)) {
            return console.log('WARN:', clc.red('NO process.env.ADMIN_EMAIL && process.env.ADMIN_PASSW specified'));
        }
        const abrikos = await db.user.findOne({email: process.env.ADMIN_EMAIL})
        if (!abrikos) {
            db.user.create({
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSW,
                isAdmin: true
            })
        } else {
            abrikos.isAdmin = true;
            abrikos.save()
        }
    }

    initAdmin()


    app.get('/api/admin/users', passport.isAdmin, async (req, res) => {
        const users = await db.user.find().sort({logged: -1})
        res.send(users)
    })

    app.get('/api/admin/user/:id/block', passport.isAdmin, async (req, res) => {
        const user = await db.user.findById(req.params.id)
        user.blocked = !user.blocked
        await user.save()
        res.sendStatus(200)
    })

    app.get('/api/admin/user/:id/delete', passport.isAdmin, async (req, res) => {
        const user = await db.user.findById(req.params.id)
        await user.delete()
        res.sendStatus(200)
    })

    app.get('/api/admin/chassis', passport.isAdmin, async (req, res) => {
        const list = await db.chassis.find()
        res.send(list)
    })

    app.post('/api/admin/chassis-copy-image/:id', passport.isAdmin, async (req, res) => {
        const {id} = req.params;
        const {file} = req.body;
        const chassis = await db.chassis.findById(id)
        fs.copyFile('/home/abrikos/Downloads/choosen/' + file, './frontend/static/chassis/' + chassis.partNumber + '.jpg', (err) => {
            if (err) throw err;
            res.sendStatus(200)
        });

    })


    app.get('/api/admin/chassis-dirs', passport.isAdmin, async (req, res) => {
        fs.readdir('/home/abrikos/Downloads/choosen', {}, (e, list) => {
            res.send(list)
        })

    })


    app.post('/api/admin/upload-chassis-image/:id', passport.isAdmin, async (req, res) => {
        try {
            const {id} = req.params;
            const chassis = await db.chassis.findById(id)
            await sharp(req.files.file.tempFilePath).resize(190).toFile('./upload/' + chassis.partNumber + '.jpg')
            res.sendStatus(200)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

    app.post('/api/admin/switch-role', passport.isAdmin, async (req, res) => {
        try {
            const user = await db.user.findById(req.body.id)
            const admins = await db.user.find({isAdmin: true})
            if (admins.length <= 2 && user.isAdmin) throw {error: 406, message: 'Невозможно снять привилегии т.к. количество оставшихся админов 2'}
            user.isAdmin = !user.isAdmin
            await user.save()
            res.sendStatus(200)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

    //db.chassis.find().then(c=>console.log(c.map(cc=>cc.form)))
    //db.component.find({partNumber: '4 SATA - 1*SFF-8643'}).then(console.log)
    //db.chassis.find().then(console.log)


    app.post('/api/admin/upload-components', passport.isAdmin, async (req, res) => {
        try {
            const stat = await parseComponentXLS(req.files.file.tempFilePath);
            fs.unlink(req.files.file.tempFilePath, () => {
            })
            res.send(stat)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

    app.post('/api/admin/upload-services', passport.isAdmin, async (req, res) => {
        try {
            const stat = await parseServiceXLS(req.files.file.tempFilePath);
            fs.unlink(req.files.file.tempFilePath, () => {
            })
            res.send(stat)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

    //db.configuration.findById('63843875b69e143f309c27c0').populate(db.configuration.population).then(i=> {        console.log(i.parts)    })
    //parseServiceXLS('./service.xlsb')
    async function parseServiceXLS(file){
        const workbook = XLSX.readFile(file);
        const sheet_name_list = workbook.SheetNames;
        const items = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
        let services = 0;
        for(const item of items){
            const data ={
                partNumber: item.__EMPTY,
                article: item.__EMPTY_1,
                name: item.__EMPTY_2,
                price: item.__EMPTY_3,
                priceNet: item.__EMPTY_4,
                discount1: item.__EMPTY_5,
                discount2: item.__EMPTY_6,
                level: item.__EMPTY_7,
                period: item.__EMPTY_8.replace('Y',''),
                coefficient: item.__EMPTY_9,
            }
            try {
                await db.service.updateOne({article: data.article}, data, {upsert: true})
                services++;
            }catch (e) {
            }
        }
        return {services}
        //const added = await db.service.find({partNumber:'QSRV-160402'})
        //console.log(added)
        //const ch = await db.chassis.findOne().populate('services')
        //console.log(ch.services.length)

    }

    //db.component.find({partNumber:'QSC-QSFP0.1G100E-850'}).then(console.log);

    async function parseComponentXLS(file, deleteAll) {
        if (deleteAll) {
            /*await db.component.deleteMany({})
            await db.chassis.deleteMany({})
            await db.configuration.deleteMany({})
            await db.spec.deleteMany({})*/
        }
        try {
            const platformNames = [
                'G2',
                'G3',
                'G2R',
                'AMD',
                'JBOD',
                'Adisk'
            ]
            const workbook = XLSX.readFile(file);
            const sheet_name_list = workbook.SheetNames;
            const items = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
            let chassis = 0;
            let components = 0;
            const pnArray = items.map(i=>i.PN?.trim())
            const notExist = await db.component.find({partNumber:{$nin:pnArray}})
            await db.part.deleteMany({component:{$in:notExist.map(c=>c._id)}})
            await db.component.deleteMany({_id:{$in:notExist.map(c=>c._id)}})
            for (const item of items) {
                const platforms = []
                for (const key of Object.keys(item)) {
                    if (platformNames.includes(key)) platforms.push(key)
                    item.platforms = platforms;
                    //item[key.toLowerCase()] = item[key].trim()
                }
                const fields = {
                    type: item.Type?.trim(),
                    price: item['цена GPL'],
                    category: item.Family?.trim(),
                    params: item.Description?.trim(),
                    partNumber: item.PN?.trim(),
                    descFull: item.DescFull?.trim(),
                    platforms,
                }

                if(!fields.partNumber) continue
                if (!fields.descFull) fields.descFull = fields.params
                if (fields.category === 'Chassis') {
                    chassis++
                    const data = chassisData(fields)
                    await db.chassis.updateOne({partNumber: data.partNumber}, data, {upsert: true})
                } else {
                    components++
                    const data = componentData(fields)
                    const x  = await db.component.updateOne({partNumber: data.partNumber}, data, {upsert: true})
                    if(fields.partNumber==='4 SATA - 1*SFF-8643') console.log(data)
                }
            }
            return {chassis, components}
        } catch (e) {
            console.error(e)
        }
    }

    //db.component.find({partNumber:'4 SATA - 1*SFF-8643'}).then(console.log)
    //parseComponentXLS('export.xlsb.xlsx', 1)
    //db.component.find().then(console.log)
    function chassisData(data) {
        data.platform = data.platforms.join(',')
        data.disksFormFactor = data.type
        return data
    }

    function componentData(data) {
        if (data.type === 'SSD') {
            if (data.params.match('M.2')) {
                data.type = 'SSD m.2'
            } else if (data.params.match('U.2')) {
                data.type = 'SSD U.2 NVMe'
            } else {
                data.type = 'SSD 2.5'
            }
        } else if (data.type && data.type.match('RAID')) {
            data.type = 'RAID'
        } else if (data.category === 'PSU') {
            data.category = 'Power'
        } else if (data.type === 'Cable for backplane') {
            data.type = 'Cable'
        }
        return data
    }


}
