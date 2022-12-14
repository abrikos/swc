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
        name: String,
        params: String,
        price: {type: Number, default: 0}
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

schema.virtual('parseDigits')
    .get(function () {
        const dig = this.partNumber.split('-')[1]
        const match = this.platform === 'JBOD' ? dig.match(/(\d)(\d\d)/) : dig.match(/(\d)(\d)(\d\d)(\d\d)/)
        const res = {units: match[1], cpu: match[2], disks: match[3] || match[2], ether: match[4]}
        return res
    })

schema.virtual('disks')
    .get(function () {
        //if(this.platform === 'JBOD')            console.log(this.partNumber, this.parseDigits.disks)
        return this.parseDigits.disks * 1
    })

schema.virtual('disksOnlySmall')
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
        return this.parseDigits.units * 1
        //const match = this.descFull.match(/(\d)U/)
        //return match[1] * 1
    })

schema.virtual('services', {
    ref: 'service',
    localField: 'partNumber',
    foreignField: 'partNumber'
})


module.exports = mongoose.model(name, schema)


