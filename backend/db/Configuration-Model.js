const mongoose = require('mongoose');
const moment = require("moment");
const Schema = mongoose.Schema;
const name = 'configuration';

const schema = new Schema({
        name: {type: String},
        count: {type: Number, default: 1, min: 0},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
        chassis: {type: mongoose.Schema.Types.ObjectId, ref: 'chassis'},
        service: {type: mongoose.Schema.Types.ObjectId, ref: 'service'},
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
    {path: 'chassis', populate: {path: 'services', options: {sort: {'level': 1, 'period':-1}}}},
    {path: 'service'}
]

schema.virtual('partsSorted')
    .get(function () {

        const x = this.parts.sort((a, b) => {
            if (a.component.basketOrder < b.component.basketOrder) return -1
            if (a.component.basketOrder > b.component.basketOrder) return 1
            return 0
        })
        return x
    })

schema.virtual('date')
    .get(function () {
        return moment(this.createdAt).format('YYYY-MM-DD HH:mm');
    })


schema.virtual('priceService')
    .get(function (){
        return (this.priceComponents * (this.service ? this.service.coefficient : 0)).toFixed()
    })

schema.virtual('priceComponents')
    .get(function () {
        let sum = this.chassis?.price || 0
        for (const item of this.parts) {
            sum += item.price
        }
        return sum;
    })

schema.virtual('price')
    .get(function () {
        return this.priceComponents * 1 + this.priceService * 1
    })

schema.virtual('priceTotal')
    .get(function () {
        return (this.price ) * this.count
    })

schema.virtual('memCount')
    .get(function () {
        return this.parts.filter(p => p.component.category === 'Memory').reduce((a, b) => a + b.count, 0)
    })

schema.virtual('cpuCount')
    .get(function () {
        return this.parts.filter(p => p.component.category === 'CPU').reduce((a, b) => a + b.count, 0)
    })

schema.virtual('gpuCount')
    .get(function () {
        return this.parts.filter(p => p.component.type === 'GPU').reduce((a, b) => a + b.count, 0)
    })

schema.virtual('lanCount')
    .get(function () {
        return this.parts.filter(p => p.component.type === 'LAN').reduce((a, b) => a + b.count, 0)
    })

schema.virtual('raidCount')
    .get(function () {
        return this.parts.filter(p => p.component.type === 'RAID').reduce((a, b) => a + b.count, 0)
    })

schema.virtual('fcCount')
    .get(function () {
        return this.parts.filter(p => p.component.type === 'FC').reduce((a, b) => a + b.count, 0)
    })

schema.virtual('nvmeCount')
    .get(function () {
        return this.parts.filter(p => p.component.type === 'SSD U.2 NVMe').reduce((a, b) => a + b.count, 0)
    })

schema.virtual('rearBayCount')
    .get(function () {
        return this.parts.filter(p => p.component.type === 'Rear bay').reduce((a, b) => a + b.count, 0)
    })

schema.virtual('diskCount')
    .get(function () {
        return this.parts.filter(p => ['HDD', 'SSD 2.5'].includes(p.component.type)).reduce((a, b) => a + b.count, 0)
    })

schema.virtual('power')
    .get(function () {
        return this.parts.filter(p => p.component.category === 'Power').reduce((a, b) => a + b.component.power, 0)
    })

schema.virtual('riserAvailable')
    .get(function () {
        return this.chassis.units * 2 - this.riserCount;
    })

schema.virtual('riserX16Count')
    .get(function () {
        return this.parts.filter(p => p.component.riserPorts === 16).reduce((a, b) => a + b.count, 0)
    })

schema.virtual('riserCount')
    .get(function () {
        return this.parts.filter(p => p.component.category === 'Riser').reduce((a, b) => a + b.count, 0)
    })

schema.virtual('parts', {
    ref: 'part',
    localField: '_id',
    foreignField: 'configuration'
})


module.exports = mongoose.model(name, schema)


