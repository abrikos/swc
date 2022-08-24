require('dotenv').config();
const db = require('./models')
async function sync() {
    //const x = await db.sequelize.authenticate()
    //console.log(x)
    await db.sequelize.sync()
}

sync()