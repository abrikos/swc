const mongoose = require('mongoose');
const chassis = require("./Chassis-Model")
const user = require("./User-Model")
const token = require("./Token-Model")

module.exports = {chassis, user, token}

try {
  mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true, //make this also true
  })
  console.log('Connect MongoDB:', process.env.MONGODB_URI)
} catch (e) {
  console.log('Mongoose error:', e.message)
}


