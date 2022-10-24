const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const name = 'chassis';


const schema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    name: {type: String},
  },
  {
    timestamps: {createdAt: 'createdAt'},
    toObject: {virtuals: true},
    // use if your results might be retrieved as JSON
    // see http://stackoverflow.com/q/13133911/488666
    toJSON: {virtuals: true}
  });


module.exports = mongoose.model(name, schema)


