const mongoose = require('mongoose');
const md5 = require("md5");
const Schema = mongoose.Schema;
const name = 'spec';


const schema = new Schema({
        name: {type: String},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    },
    {
        timestamps: {createdAt: 'createdAt'},
        toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });

schema.virtual('assemblies', {
    ref: 'assembly',
    localField: '_id',
    foreignField: 'spec'
})

module.exports = mongoose.model(name, schema)


