const passport = require('../passport');

module.exports = function (app) {
    const {db} = app.locals;
    app.get('/api/chassis/:id/base', async (req, res) => {
        const chassis = await db.chassis.findByPk(req.params.id);

    })

}
