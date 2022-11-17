const passport = require('../passport');
const fs = require('fs');
const csv = require('csv-parser')
const clc = require("cli-color");
const XLSX = require('xlsx');
const sharp = require('sharp');
module.exports = function (app) {
    const {db} = app.locals;

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
        const users = await db.user.find()
        res.send(users)
    })

    app.get('/api/admin/chassis', passport.isAdmin, async (req, res) => {
        const list = await db.chassis.find()
        res.send(list)
    })

    app.post('/api/admin/chassis-copy-image/:id', passport.isAdmin, async (req, res) => {
        const {id} = req.params;
        const {file} = req.body;
        console.log(file)
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
        const user = await db.user.findById(req.body.id)
        user.isAdmin = !user.isAdmin
        await user.save()
        res.sendStatus(200)
    })

    //db.chassis.find().then(c=>console.log(c.map(cc=>cc.form)))
    //db.component.find({partNumber: '4 SATA - 1*SFF-8643'}).then(console.log)
    //db.chassis.find().then(console.log)


    app.post('/api/admin/upload-list', passport.isAdmin, async (req, res) => {
        try {
            const stat = await parseXLS(req.files.file.tempFilePath);
            fs.unlink(req.files.file.tempFilePath, () => {
            })
            res.send(stat)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

    async function parseXLS(file, deleteAll) {
        if(deleteAll){
            await db.component.deleteMany({})
            await db.chassis.deleteMany({})
            await db.configuration.deleteMany({})
            await db.spec.deleteMany({})
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
            for (const item of items) {
                console.log(item)
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
                if (!fields.descFull) fields.descFull = fields.params
                if (fields.category === 'Chassis') {
                    chassis++
                    const data = chassisData(fields)
                    await db.chassis.updateOne({partNumber: data.partNumber}, data, {upsert: true})
                } else {
                    components++
                    console.log(fields)
                    const data = componentData(fields)
                    await db.component.updateOne({partNumber: data.partNumber}, data, {upsert: true})
                }
            }
            return {chassis, components}
        }catch (e) {
            console.error(e)
        }
    }

    //parseXLS('export.xlsb.xlsx', 0)
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
            //console.log(data)
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
