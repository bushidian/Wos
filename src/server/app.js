/*jshint node:true*/
'use strict';

var http = require('http');
var https = require('https');
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var compress = require('compression');
var cors = require('cors');
var errorHandler = require('./routes/utils/errorHandler')();
var favicon = require('serve-favicon');
var logger = require('morgan');


var port = process.env.PORT || 3000;
var routes;

var environment = process.env.NODE_ENV;
var oneDay = 86400000;
var pkg = require('./../../package.json');

var privateKey = fs.readFileSync(__dirname + '/resource/sslcert/key.pem', 'utf8');
var certificate = fs.readFileSync(__dirname + '/resource/sslcert/key-cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(compress());  // Compress response data with gzip
app.use(logger('dev'));  // logger
app.use(favicon(__dirname + '/favicon.ico'));
app.use(cors()); // enable ALL CORS requests

routes = require('./routes/index')(app);

app.use(errorHandler.init);

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

app.get('/ping', function(req, res, next) {
    res.send('pong');
});

switch(environment){
    case 'stage':
        console.log('** STAGE **');
        app.use('/', express.static('./build/stage/'));
        break;
    default: 
        console.log('** DEV **');
        app.use('/', express.static(pkg.paths.client, {maxAge: oneDay}));
        app.use('/', express.static('./'));
        break;
}

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(port, function() {
    console.log('************************');
    console.log('Code Camper MEAN Server');
    console.log('Listening on port ' + port);
    console.log('\nRemember to first start MongoDb server');
    console.log('************************\n');
    console.log('env = ' + app.get('env') +
        '\nport = ' + port +
        '\n__dirname = ' + __dirname +
        '\nprocess.cwd() = ' + process.cwd());
});

httpsServer.listen(port + 1, function() {
    console.log('************************');
    console.log('Code Camper MEAN Https Server');
    console.log('Listening on port ' + (port + 1));
    console.log('\nRemember to first start MongoDb server');
    console.log('************************\n');
    console.log('env = ' + app.get('env') +
        '\nport = ' + port +
        '\n__dirname = ' + __dirname +
        '\nprocess.cwd() = ' + process.cwd());
});