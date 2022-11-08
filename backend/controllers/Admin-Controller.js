const passport = require('../passport');
const fs = require('fs');
const csv = require('csv-parser')
const clc = require("cli-color");

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
        fs.copyFile('/home/abrikos/Downloads/choosen/'+file, './frontend/static/chassis/' + chassis.partNumber + '.jpg', (err) => {
            if (err) throw err;
            res.sendStatus(200)
        });

    })


    app.get('/api/admin/chassis-dirs', passport.isAdmin, async (req, res) => {
        fs.readdir('/home/abrikos/Downloads/choosen', {}, (e,list)=>{
            res.send(list)
        })

    })


    app.post('/api/admin/upload-chassis-image/:id', passport.isAdmin, async (req, res) => {
        try {
            const {id} = req.params;
            const chassis = await db.chassis.findById(id)
            await req.files.file.mv('./frontend/static/chassis/' + chassis.partNumber + '.jpg')
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

    //db.component.find({type: 'HDD'}).then(console.log)
    //db.component.find({partNumber: '4 SATA - 1*SFF-8643'}).then(console.log)

    app.post('/api/admin/upload-list', passport.isAdmin, async (req, res) => {
        await db.component.deleteMany({})
        await db.chassis.deleteMany({})
        await db.configuration.deleteMany({})
        await db.spec.deleteMany({})
        fs.createReadStream(req.files.file.tempFilePath)
            .pipe(csv())
            .on('data', async (data) => {
                try {
                    const platforms = []
                    if (data.G2R) platforms.push('G2R')
                    if (data.G2) platforms.push('G2')
                    if (data.G3) platforms.push('G3')
                    if (data.AMD) platforms.push('AMD')
                    if (data.JBOD) platforms.push('JBOD')
                    if (data.Family === 'Chassis') {
                        await db.chassis.updateOne({partNumber: data.PN.trim()}, {
                            platform: platforms.join(''),
                            vendor: data.Type.trim(),
                            descShort: data['Столбец2'].trim(),
                            params: data.DescShort.trim(),
                            partNumber: data.PN.trim(),
                            price: data['цена GPL '].trim(),
                            cpu: data.AMD ? 'AMD' : 'Intel',
                            descFull: data.DescFull.trim()
                        }, {upsert: true})
                    } else {
                        let type = data.Type.trim() || data.Family.trim();
                        const category = data.Family.trim();
                        if (type === 'SSD') {
                            type = data.DescShort.match('U.2') ? 'SSD U.2 NVMe' :
                                data.DescShort.match('M.2') ? 'SSD m.2' : 'SSD 2.5'
                        } else if (type.match('RAID')) {
                            type = 'RAID'
                        } else if (type === 'PSU') {
                            type = 'Power'
                        } else if (type === 'Cable for backplane') {
                            type = 'Cable'
                        }
                        await db.component.updateOne({partNumber: data.PN.trim()}, {
                            platforms,
                            type,
                            category,
                            descShort: data.DescShort.trim(),
                            partNumber: data.PN.trim(),
                            price: data['цена GPL '].trim(),
                            descFull: data.DescFull.trim()
                        }, {upsert: true})
                    }
                } catch (e) {

                }
                fs.unlink(req.files.file.tempFilePath, () => {
                })

            })
            .on('end', () => {
                res.sendStatus(200)
            });


    })

}
