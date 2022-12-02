const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const name = 'service';

const schema = new Schema({
        partNumber: String,
        article: String,
        name: String,
        price: {type:Number, default:0},
        priceNet: {type:Number, default:0},
        discount1: Number,
        discount2: Number,
        level: String,
        period: Number,
        coefficient: Number,
    },
    {
        timestamps: {createdAt: 'createdAt'},
        toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });

module.exports = mongoose.model(name, schema)


