const mongoose = require('mongoose');
const component = require("./Component-Model")
const user = require("./User-Model")
const token = require("./Token-Model")
const assembly = require("./Assembly-Model")
const chassis = require("./Chassis-Model")
const part = require("./Part-Model")
const spec = require("./Spec-Model")

module.exports = {component, user, token, assembly, chassis, part, spec}

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


