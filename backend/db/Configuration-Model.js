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
        return (this.priceComponents * (this.service ? this.service.coefficient : 0))
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

schema.virtual('isRearBayNeeded')
    .get(function () {
        return this.rearBayCount < this.rearBaysNeeded
    })

schema.virtual('rearBayNeeded')
    .get(function () {
        const needs =  [0, 0, 1, 2, 2];
        return needs[[this.nvmeCount]]
    })

schema.virtual('memCount')
    .get(function () {
        return this.parts.filter(p => p.component.category === 'Memory').reduce((a, b) => a + b.count, 0)
    })

schema.virtual('raidTrimodeCount')
    .get(function () {
        return this.parts.filter(p => p.component.partNumber==='94008IR').reduce((a, b) => a + b.count, 0)
    })

schema.virtual('raidTrimode8iCount')
    .get(function () {
        return this.parts.filter(p => p.component.type==='RAID' && p.component.partNumber.match('8I')).reduce((a, b) => a + b.count, 0)
    })

schema.virtual('raidTrimode16iCount')
    .get(function () {
        return this.parts.filter(p => p.component.type==='RAID' && p.component.partNumber.match('16I')).reduce((a, b) => a + b.count, 0)
    })

schema.virtual('sasCount')
    .get(function () {
        return this.parts.filter(p => p.component.type==='RAID' && p.component.description.match('SAS')).reduce((a, b) => a + b.count, 0)
    })

schema.virtual('cable8643Count')
    .get(function () {
        return this.parts.filter(p => p.component.type==='Cable' && p.component.partNumber.match('8643')).reduce((a, b) => a + b.count, 0)
    })

schema.virtual('cableSataCount')
    .get(function () {
        return this.parts.filter(p => p.component.type==='Cable' && p.component.partNumber==='SATA-SATA').reduce((a, b) => a + b.count, 0)
    })

schema.virtual('hbaCount')
    .get(function () {
        return this.parts.filter(p => p.component.type==='RAID' && p.component.partNumber.match('HBA')).reduce((a, b) => a + b.count, 0)
    })

schema.virtual('raid93Count')
    .get(function () {
        return this.parts.filter(p => p.component.type==='RAID'
            && p.component.partNumber.match('93')
            && !['93008I8EHBA', '93008IHBA'].includes(p.component.partNumber)
        ).reduce((a, b) => a + b.count, 0)
    })

schema.virtual('cacheModule93Count')
    .get(function () {
        return this.parts.filter(p => p.component.type==='RAID' && p.component.partNumber==='CVM02').reduce((a, b) => a + b.count, 0)
    })

schema.virtual('raid94Count')
    .get(function () {
        return this.parts.filter(p => p.component.type==='RAID' && p.component.partNumber.match(/94|95/)).reduce((a, b) => a + b.count, 0)
    })

schema.virtual('cacheModule94Count')
    .get(function () {
        return this.parts.filter(p => p.component.type==='RAID' && p.component.partNumber==='CVPM05').reduce((a, b) => a + b.count, 0)
    })

schema.virtual('memModuleSize')
    .get(function () {
        const module = this.parts.find(p => p.component.category === 'Memory')
        if(module) return module.component.memorySize
    })

schema.virtual('memMaxCount')
    .get(function () {
        return this.chassis.platform === 'G3' ? 32 : 24
    })

schema.virtual('cpuCount')
    .get(function () {
        return this.parts.filter(p => p.component.category === 'CPU').reduce((a, b) => a + b.count, 0)
    })

schema.virtual('pcieCount')
    .get(function () {
        return this.parts.filter(p => p.component.category === 'PCI-E' && p.component.type !== 'LAN OCP 3.0').reduce((a, b) => a + b.count, 0)
    })

schema.virtual('ocpCount')
    .get(function () {
        return this.parts.filter(p => p.component.type === 'LAN OCP 3.0').reduce((a, b) => a + b.count, 0)
    })

schema.virtual('gpuCount')
    .get(function () {
        return this.parts.filter(p => p.component.type === 'GPU').reduce((a, b) => a + b.count, 0)
    })

schema.virtual('lanCount')
    .get(function () {
        return this.parts.filter(p => p.component.type === 'LAN').reduce((a, b) => a + b.count, 0)
    })

schema.virtual('lanPortsCount')
    .get(function () {
        return this.parts.filter(p => p.component.type === 'LAN').reduce((a, b) => a + b.component.lanPorts, 0)
    })

schema.virtual('lanCount100')
    .get(function () {
        return this.parts.filter(p => p.component.type === 'LAN' && p.component.lanSpeed===100).reduce((a, b) => a + b.count, 0)
    })

schema.virtual('sfpCount')
    .get(function () {
        return this.parts.filter(p => p.component.type === 'Transceiver' && p.component.description.match('SFP')).reduce((a, b) => a + b.count, 0)
    })

schema.virtual('cableCount')
    .get(function () {
        return this.parts.filter(p => p.component.type === 'Transceiver' && p.component.partNumber.match('CAB')).reduce((a, b) => a + b.count, 0)
    })

schema.virtual('transceiverCount')
    .get(function () {
        return this.parts.filter(p => p.component.type === 'Transceiver').reduce((a, b) => a + b.count, 0)
    })

schema.virtual('cable4U2Count')
    .get(function () {
        return this.parts.filter(p => p.component.partNumber === '1*SFF-8643 - 1*SFF-8643').reduce((a, b) => a + b.count, 0)
    })

schema.virtual('ssdU2Count')
    .get(function () {
        return this.parts.filter(p => p.component.type === 'SSD U.2 NVMe').reduce((a, b) => a + b.count, 0)
    })

schema.virtual('raidCount')
    .get(function () {
        return this.parts.filter(p => p.component.type === 'RAID' && !['CVM02', 'CVPM05'].includes( p.component.partNumber)).reduce((a, b) => a + b.count, 0)
    })

schema.virtual('cacheModuleCount')
    .get(function () {
        return this.parts.filter(p => p.component.type === 'RAID' && ['CVM02', 'CVPM05'].includes( p.component.partNumber)).reduce((a, b) => a + b.count, 0)
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

schema.virtual('powerCount')
    .get(function () {
        return this.parts.filter(p => p.component.category === 'Power').reduce((a, b) => a + b.count, 0)
    })

schema.virtual('pcieMaxCount')
    .get(function () {
        return this.parts.filter(p => p.component.category === 'Riser').reduce((a, b) => a + b.component.riserSlots * b.count, 0)
    })

schema.virtual('riserMaxCount')
    .get(function () {
        return this.chassis.units * 2;
    })

schema.virtual('risersAvailable')
    .get(function () {
        return this.riserMaxCount - this.rearBayCount;
    })

schema.virtual('cpuMaxCount')
    .get(function () {
        return 2;
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


