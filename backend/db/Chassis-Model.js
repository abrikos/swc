const mongoose = require('mongoose');
const moment = require("moment/moment");
const Schema = mongoose.Schema;
const name = 'chassis';


const schema = new Schema({
        platform: {type: String},
        disksFormFactor: String,
        paramsData: Object,
        partNumber: {type: String, unique: true},
        descShort: String,
        descFull: String,
        params: String,
        price: {type:Number, default:0}
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
        return moment(this.createdAt).format('YYYY-MM-DD HH:mm');
    })

schema.virtual('discs')
    .get(function () {
        const match = this.params.match(/(\d+)\*.*?FF/)
        return match[1] * 1;
    })

schema.virtual('discsOnlySmall')
    .get(function () {
        return this.type === 'SFF'
    })

schema.virtual('cpu')
    .get(function () {
        if (this.platform !== 'JBOD') {
            return this.platform === 'AMD' ? 'AMD' : 'Intel';
        }
    })

schema.virtual('isSFF')
    .get(function () {
        return this.disksFormFactor === 'SFF'
    })

schema.virtual('units')
    .get(function () {
        const match = this.descFull.match(/(\d)U/)
        return match[1] * 1
    })

schema.virtual('services', {
    ref: 'service',
    localField: 'partNumber',
    foreignField: 'partNumber'
})


module.exports = mongoose.model(name, schema)


