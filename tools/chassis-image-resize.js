const sharp = require("sharp");
const fs = require("fs")
const dir = './frontend/static/chassis/'
const filenames = fs.readdirSync(dir);

filenames.forEach(async file => {
    console.log(file)
    await sharp(dir + file).resize(190).toFile(dir + '-' + file)
    fs.unlinkSync(dir + file)
    fs.renameSync(dir + '-' + file, dir + file)
})
