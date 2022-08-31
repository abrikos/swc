const passport = require('../passport');
const sequelize = require("sequelize");
const md5 = require("md5");
const moment = require("moment/moment");
const mailer = require('../mailer');

module.exports = function (app) {
    const {db} = app.locals;

    app.post('/api/auth/login', passport.authenticate)

    app.post('/api/auth/signup', async (req, res) => {
        try {
            const {email, password, passwordConfirm} = req.body
            if(password !== passwordConfirm) throw {message: 'Passwords do not match'}
            const user = await db.swusers.create({userpassword: password})
            const e = await db.swuseremails.create({email, linktypeid: user.userid})
            res.sendStatus(200);
        } catch (e) {
            if(e.parent){
                e.message = 'Email exists'
                //console.log(e.parent.sqlMessage)
            }
            app.locals.errorLogger(e, res)
        }
    })

    app.post('/api/auth/logout', passport.logout);

    app.post('/api/auth/user', passport.isLogged, async (req, res) => {
        const {user} = res.locals;
        res.send({email:user.email, username: user.swuser.fullname})
    })

    app.get('/api/user/confirm-reset/:code', async (req, res) => {
        try {
            const found = await db.swuseremails.findOne({
                where: {resetpassword: req.params.code},
                include: [{model: res.locals.db.swusers}],
                //logging: console.log
            })
            if (!found) throw {message: 'Wrong reset code'}
            const passwd = found.swuser.userpassword = md5(moment().unix()).substr(0, 5)
            found.swuser.save()
            found.resetpassword = '';
            found.save();
            mailer.sendMail({
                from: process.env.MAIL_USER,
                to: found.email,
                subject: 'New password',
                text: passwd
            })
            res.redirect('/user/reset-password-done')
        }catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

    app.post('/api/user/reset-password', async (req, res) => {
        const {email} = req.body;
        try {
            const found = await db.swuseremails.findOne({where: {email}})
            if (!found) throw {message: 'Wrong email'}
            found.resetpassword = md5(moment().unix());
            found.save()
            const site =  'https://' + req.get('host') + '/api/user/confirm-reset/' + found.resetpassword
            mailer.sendMail({
                from: process.env.MAIL_USER,
                to: email,
                subject: 'Reset password',
                text: `To confirm password reset please visit: ${site}`
            })
            const {user} = res.locals;
            res.sendStatus(200)
        } catch (e) {
            app.locals.errorLogger(e, res)
        }
    })

    app.post('/api/user/update', passport.isLogged, async (req, res) => {
        const {user} = res.locals;
        console.log(user.swuser)
        const {email, username} = req.body;
        user.email = email;
        await user.save()
        user.swuser.fullname =  username;
        await user.swuser.save()
        res.sendStatus(200);
    })

}
