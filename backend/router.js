const passport = require('./passport');
const fs = require('fs');
const uploadDir = './upload';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
module.exports = function (app) {
    const {db} = app.locals;
    function catcher(e, res) {
        console.log(e)
        if (e.status)
            res.status(e.status).send(e)
        else
            res.status(500).send({message: e.message})
    }

    async function moveFile(f, post) {
        console.log(f)
        console.log({postId: post.id, ...f})
        const file = await sequelize.models.image.create({messageId: post.id, ...f})
        console.log(file.path)
        f.mv('.' + file.path)
    }

    app.get('/',  async (req, res) => {
        const {user} = res.locals;
        const post = await db.swusers.findByPk(14)
        console.log(post)
        res.send({});
    })


}
