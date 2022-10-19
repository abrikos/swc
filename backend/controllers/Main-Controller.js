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

    async function search2({model, ticketid, text, email, department}) {
        const rules1 = []
        const rulesModel = {customfieldid: 12}
        if (model) rulesModel.fieldvalue = model
        if (ticketid) rules1.push({ticketid})
        if (text) rules1.push({subject: {[Op.like]: `%${text}%`}})
        if (email) rules1.push({email: {[Op.like]: `%${email}%`}})
        if (department) rules1.push({departmenttitle: {[Op.like]: `%${department}%`}})
        return db.swtickets.findAll({
            attributes: ['ticketid', 'departmenttitle', 'email', 'subject', 'fullname', 'dateline', 'ownerstaffname'],
            include: [{model: db.swcustomfieldvalues, attributes: ['fieldvalue'], where:rulesModel, required:false}],
            where: {
                [Op.and]: rules1
            },
            logging: console.log
        })
    }

    app.get('/api/ticket/view/:id', async (req, res)=>{
        const {user} = res.locals;
        const ticket = await db.swtickets.findByPk(req.params.id, {
            include: [
                {model: db.swticketposts, include:[{model:db.swusers}]},
                {model: db.swdepartments},
                {model: db.swattachments},
                {model: db.swtickettypes},
                {model: db.swcustomfieldvalues, attributes: ['fieldvalue'], where:{customfieldid: 12}, required:false},
                {model: db.swticketstatus},
                {model: db.swticketpriorities},
                {model: db.swusers}
            ],
            order: [
                [db.swticketposts, 'dateline', 'ASC']
            ]
        })
        res.send(ticket)
    })
}