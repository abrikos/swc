const fs = require("fs");
const file = __dirname + '/../../frontend/dist/index.html'

module.exports = function (app) {
    app.get('/api/build-date', (req, res) => {
        fs.stat(file, (err, stats) => {
            res.send(stats)
        })


    })

}