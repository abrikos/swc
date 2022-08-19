require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const router = require('./router')
const db = require('./database/models')

const portWeb = process.env.API_PORT || 4000;
const app = express();
app.use(express.static('upload'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

app.use(function(req,res, next) {
  res.locals.db = db;
  next();
});
app.locals.db = db;
router(app);


async function init() {
  //console.log(await db.swusers.findByPk(14))
  app.listen(portWeb, () => {
    console.log(`server started at http://localhost:${portWeb}`);
  });
}

init()
