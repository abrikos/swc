const mongoose = require('mongoose');
const md5 = require("md5");
const moment = require("moment");
const Schema = mongoose.Schema;
const name = 'user';

const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const schema = new Schema({
        fullName: {type: String},
        isAdmin: {type: Boolean},
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: 'Email address is required',
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        logged: Number,
        blocked: {type:Boolean, default: false},
        passwordHash: {type: String},
        resetCode: {type: String},
    },
    {
        timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'},
        toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });

schema.methods.checkPasswd = function (passwd) {
    return md5(passwd) === this.passwordHash;
}

schema.virtual('password')
    .get(function () {
        return '';
    })
    .set(function (value) {
        this.passwordHash = md5(value)
    })

schema.virtual('date')
    .get(function () {
        return moment(this.createdAt).format('YYYY-MM-DD HH:mm');
    })

schema.virtual('loggedDate')
    .get(function () {
        if(!this.logged) return moment(this.updatedAt).format('YYYY-MM-DD HH:mm');
        return moment.unix(this.logged).format('YYYY-MM-DD HH:mm');
    })


schema.virtual('tokens', {
    ref: 'token',
    localField: '_id',
    foreignField: 'user'
})

schema.virtual('configurations', {
    ref: 'configuration',
    localField: '_id',
    foreignField: 'user'
})


module.exports = mongoose.model(name, schema)


