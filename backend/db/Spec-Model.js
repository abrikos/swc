const mongoose = require('mongoose');
const md5 = require("md5");
const Schema = mongoose.Schema;
const name = 'spec';


const schema = new Schema({
        name: {type: String},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
        assemblies: [{type: mongoose.Schema.Types.ObjectId, ref: 'assembly'}],
    },
    {
        timestamps: {createdAt: 'createdAt'},
        toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });

module.exports = mongoose.model(name, schema)


