const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const name = 'assembly';


const schema = new Schema({
        name: {type: String},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
        components: [{type: mongoose.Schema.Types.ObjectId, ref: 'component'}],
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

schema.virtual('price')
    .get(function () {
        let sum = this.chassis?.price || 0
        return sum + this.components.map(c=>c.price).reduce((p,c) => p + c, 0);
    })


module.exports = mongoose.model(name, schema)


