const mongoose = require('mongoose');
const md5 = require("md5");
const moment = require("moment/moment");
const Schema = mongoose.Schema;
const name = 'spec';


const schema = new Schema({
        name: {type: String},
        shared: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
        configurations: [{type: mongoose.Schema.Types.ObjectId, ref: 'configuration'}],
    },
    {
        timestamps: {createdAt: 'createdAt'},
        toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });

schema.virtual('date')
    .get(function () {
        return moment(this.createdAt).format('YYYY-MM-DD');
    })

schema.virtual('price')
    .get(function () {
        let sum = 0;
        for(const conf of this.configurations){
            sum += conf.priceTotal
        }
        return sum
    })

module.exports = mongoose.model(name, schema)


