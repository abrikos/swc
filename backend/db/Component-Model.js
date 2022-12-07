const mongoose = require('mongoose');
const moment = require("moment/moment");
const Schema = mongoose.Schema;
const name = 'component';


const schema = new Schema({
        platforms: [{type: String}],
        category: String,
        type: String,
        params: String,
        partNumber: {type: String, unique: true},
        descShort: String,
        descFull: String,
        deleted: Boolean,
        price: {type:Number, default:0}
    },
    {
        timestamps: {createdAt: 'createdAt'},
        toObject: {virtuals: true},
        // use if your results might be retrieved as JSON
        // see http://stackoverflow.com/q/13133911/488666
        toJSON: {virtuals: true}
    });

schema.virtual('basketOrder')
    .get(function () {
        switch (this.category){
            case 'CPU': return 1
            case 'Memory': return 2
            case 'Storage': return 3
            case 'Riser': return 4
            case 'PCI-E': return 5
            case 'Power': return 6
        }
        return 0
    })

schema.virtual('isSFF')
    .get(function () {
        return !!this.params?.match('SFF')
    })

schema.virtual('memorySize')
    .get(function () {
        const match = this.params?.match(/(\d+)GB/)
        return match && match[1];
    })

schema.virtual('lanSpeed')
    .get(function () {
        const match = this.params?.match(/(\d+)G/)
        return match && match[1] * 1;
    })

schema.virtual('power')
    .get(function () {
        const match = this.params?.match(/PSU (\d)\*(\d+)W/)
        return match && match[1] * match[2];
    })

schema.virtual('riserPorts')
    .get(function () {
        const match = this.params?.match('x16')
        return this.category === 'Riser' ? match ? 16 : 8 : 0;
    })

schema.virtual('riserSlots')
    .get(function () {
        const match = this.params?.split(/x\d/)
        return match.length - 1;
    })

schema.virtual('riserUnit')
    .get(function () {
        const match = this.params?.match(/(\d)U/)
        return match ? match[1] * 1 : 0;
    })



schema.virtual('description')
    .get(function () {
        return this.descFull || this.descShort;
    })

schema.virtual('date')
    .get(function () {
        return moment(this.createdAt).format('YYYY-MM-DD HH:mm');
    })


module.exports = mongoose.model(name, schema)


