const mongoose = require('mongoose');
const moment = require("moment/moment");
const Schema = mongoose.Schema;
const name = 'component';


const schema = new Schema({
        platforms: [{type: String}],
        type: String,
        category: String,
        partNumber: {type: String, unique: true},
        descShort: String,
        descFull: String,
        price: Number
    },
    {
        timestamps: {createdAt: 'createdAt'},
        toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });

schema.virtual('description')
    .get(function () {
        return this.descFull || this.descShort;
    })

schema.virtual('date')
    .get(function () {
        return moment(this.createdAt).format('YYYY-MM-DD HH:mm');
    })


module.exports = mongoose.model(name, schema)

