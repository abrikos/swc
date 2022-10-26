const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const name = 'assembly';

const schema = new Schema({
        name: {type: String},
        count: {type: Number, default: 1},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
        chassis: {type: mongoose.Schema.Types.ObjectId, ref: 'chassis'},
        draft: {type: Boolean, default: true}
    },
    {
        timestamps: {createdAt: 'createdAt'},
        toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });

schema.statics.population = [
    {path: 'parts', populate: {path: 'component'}},
    {path: 'chassis'},
]

schema.virtual('price')
    .get(function () {
        let sum = this.chassis?.price || 0
        for (const item of this.parts) {
            sum += item.price
        }
        return sum * this.count;
    })

schema.virtual('parts', {
    ref: 'part',
    localField: '_id',
    foreignField: 'assembly'
})


module.exports = mongoose.model(name, schema)


