const fs = require("fs");
const file = __dirname + '/../../frontend/dist/index.html'
const {Op} = require("sequelize");

module.exports = function (app) {
    const {db} = app.locals;
    app.get('/api/build-date', (req, res) => {
        fs.stat(file, (err, stats) => {
            res.send(stats)
        })
    })

    app.get('/api/departments/list', (req, res) => {
        db.swdepartments.findAll({where:{departmenttype:'public'}})
            .then(list => {
                res.send(list.map(d=>d.title))
            })
    })

    app.post('/api/search', async (req, res) => {
        console.time('search')
        res.send(await search2(req.body))
        console.timeEnd('search')
    })

    /*search({text: '1zzzz', email: '22', department: 'net'})
        .then(list => {
            console.log(list.length)
        })*/

    async function search2({ticketid, text, email, department}) {
        console.log('fff', ticketid)
        const rules1 = []
        if (ticketid) rules1.push({ticketid})
        if (text) rules1.push({subject: {[Op.like]: `%${text}%`}})
        if (email) rules1.push({email: {[Op.like]: `%${email}%`}})
        if (department) rules1.push({departmenttitle: {[Op.like]: `%${department}%`}})
        return db.swtickets.findAll({
            attributes: ['ticketid', 'departmenttitle', 'email', 'subject', 'fullname', 'dateline', 'ownerstaffname'],
            //include: [{model: db.swticketposts, attributes: ['ticketpostid']}],
            where: {
                [Op.and]: rules1
            },
            logging: console.log
        })
    }

    async function search({text, email, department}) {
        const rules1 = []
        if (text) rules1.push({subject: {[Op.like]: `%${text}%`}})
        if (email) rules1.push({email: {[Op.like]: `%${email}%`}})
        const tickets = await db.swtickets.findAll({
            attributes: ['ticketid'],
            where: {
                [Op.and]: rules1
            },
            //logging: console.log
        })
        console.log('T', tickets.length)

        const rules2 = []
        if (text) rules2.push({contents: {[Op.like]: `%${text}%`}})
        if (email) rules2.push({email: {[Op.like]: `%${email}%`}})
        const posts = await db.swticketposts.findAll({
            attributes: ['ticketid'],
            where: {
                [Op.and]: rules2
            }
        })
        console.log('P', posts.length)
        return db.swtickets.findAll({
            include: [
                {
                    model: db.swdepartments,
                    required: true,
                    where: {
                        title: {[Op.like]: `%${department}%`}
                    }
                },
                {model: db.swticketposts},
            ],
            where: {
                ticketid: {[Op.in]: tickets.map(p => p.ticketid).concat(posts.map(p => p.ticketid))},
            },
            //logging: console.log
        })
    }

    /*
    SELECT ticket.*  FROM `swcustomfieldvalues` as vals
    inner join swcustomfieldlinks as links on links.customfieldlinkid = vals.customfieldvalueid
    INNER JOIN swtickets as ticket on links.linktypeid = ticket.ticketid
    WHERE `fieldvalue` LIKE 'QSW-4000-12F' ORDER BY `customfieldvalueid` ASC;
    */
    /*
        SELECT vals.*, fiel.*  FROM `swcustomfieldvalues` as vals
        inner join swticketviewfields as t2f on t2f.ticketviewfieldid = vals.customfieldvalueid
        left JOIN swtickets as ticket on ticket.ticketid = t2f.ticketviewid
            WHERE ticketid=12977;
        */
}