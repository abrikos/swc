const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const name = 'part';

const schema = new Schema({
        assembly: {type: mongoose.Schema.Types.ObjectId, ref: 'assembly'},
        component: {type: mongoose.Schema.Types.ObjectId, ref: 'component'},
        count: Number
    },
    {
        timestamps: {createdAt: 'createdAt'},
        toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });

schema.virtual('price')
    .get(function () {
        return this.component.price * this.count;
    })

module.exports = mongoose.model(name, schema)


