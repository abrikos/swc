const fs = require("fs");
const moment = require("moment");
const fileIndex = __dirname + '/../../frontend/dist/index.html'
const fileLogic = __dirname + '/../../frontend/plugins/configuration-logic.js'

module.exports = function (app) {
    const {db} = app.locals;
    app.get('/api/build-date', (req, res) => {
        let fileExists = fs.existsSync(fileIndex);
        fs.stat(fileExists ? fileIndex : fileLogic, (err, stats) => {
            res.send(moment(stats.ctime)
                //.utc()
                .format('YYYY-MM-DD HH:mm:ss'))
        })
    })

}
