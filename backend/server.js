require('dotenv').config();
const db = require('./database/models')
const controllers = require('./controllers')
const WebSocket = require( "ws");
const express = require( "express");
const bodyParser = require("body-parser");
const http = require( 'http');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const clc = require("cli-color");

const app = express();
app.use(cookieParser());
app.use(express.static('upload'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));
const portWeb = process.env.API_PORT || 4000;

app.set("view engine", "ejs");

function logger(e, res){
  try {
    throw Error('')
  } catch (err) {
    const out = err.stack.split('\n')
    out.shift()
    out.shift()
    console.log('ERROR:',clc.red(e.message));
    for(const log of out) console.log(log)
  }
  res.status(e.status || 500).send(e.status ? e : {message: e.message})
}

app.use(function(req,res, next) {
  res.locals.db = db;
  res.locals.errorLogger = logger;
  next();
});
app.locals.db = db;
app.locals.errorLogger = logger
controllers(app);

app.use(function (req, res) {
  res.status(404).send('404 Not found');
});
const server = http.createServer(app);

const webSocketServer = new WebSocket.Server({server});

webSocketServer.on('connection', ws => {
  console.log('connect')
  //setInterval(()=>ws.send(''), 40000)
})

function wsSend(event, payload){
  //console.log(event, payload)
  webSocketServer.clients.forEach(client => client.send(JSON.stringify({event, payload})));
}


server.listen(portWeb, () => {
  console.log(`server started at http://localhost:${portWeb}`);
});

