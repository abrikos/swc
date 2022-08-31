const md5 = require('md5')
const moment = require('moment')
const cookieName = 'jwtSecure'

const methods = {

    async getUser(req, res) {
        if (!req.cookies[cookieName]) return;
        const name = req.cookies[cookieName];

        const token = await res.locals.db.tokens.findOne({
            include: [{model: res.locals.db.swuseremails, include: [{model: res.locals.db.swusers}]}],
            where: {name}
        })
        //console.log('token', token.swuseremail.swuser)
        if (!token) return
        return token.swuseremail;
    },

    adaptUser(user){
        return {email:user.email, username: user.swuser.fullname}
    },

    async authenticate(req, res) {
        try {
            const {email, password} = req.body
            const found = await res.locals.db.swuseremails.findOne({
                where: {email},
                include: [{model: res.locals.db.swusers}],
                //logging: console.log
            })
            if (!found) return res.status(500).send({message: 'No user found'})
            if (!found.swuser.checkPassword(password)) {
                return res.status(500).send({message: 'Wrong password'});
            }
            const token = await res.locals.db.tokens.create({userId: found.useremailid, name: md5(moment().unix())});
            res.cookie(cookieName, token.name, {
                secure: true,
                //secure: process.env.NODE_ENV !== "development",
                httpOnly: true,
                expires: new Date(moment().add(30, 'days').toISOString()),
            });
            res.sendStatus(200)
        } catch (e) {
            res.locals.errorLogger(e, res)
        }
    },

    async logout(req, res) {
        const token = await res.locals.db.tokens.findOne({where: {name: req.cookies[cookieName]}});
        if (!token) return;
        token.destroy();
        res.clearCookie(cookieName);
        res.end();
    },

    googleStrategy() {
        console.log(this)
    },

}

async function isLogged(req, res, next) {
    const found = await methods.getUser(req, res);
    if (!found) return res.status(401).send({status: 401, message: 'Must be logged user'})
    res.locals.user = found;
    return next()
}

module.exports = {...methods, isLogged}