var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var labelModel = require('./schema.js').getModel()

var http = require('http');
var path = require('path');
var fs = require('fs')
var app = express();
var server = http.createServer(app);
var port = process.env.PORT ? parseInt(process.env.PORT) : 8080;

var app = express()
    , dbUri = process.env. MONGODB_RUI || 'mongodb://127.0.0.1/knowledge';


function startServer() {

  app.use(express.static(path.join(__dirname, 'public')));

  app.get('/', (req, res, next) => {
    var filePath = path.join(__dirname, '/home.html')
    res.send("OK")
    res.sendFile(filePath)
  })


  server.on('listening', () => {

    /* Determining what the server is listening for */
    var addr = server.address(),
      bind = typeof addr === 'string' ?
      'pipe ' + addr :
      'port ' + addr.port;

    /* Outputs to the console that the webserver is ready to start listenting to requests */
    console.log('Listening on ' + bind);
  });

  /* Tells the server to start listening to requests from defined port */
  server.listen(port);
}

mongoose.connect(dbUri, function(err){
    if (err){
        return console.log(err)
    }
    startServer()
})
