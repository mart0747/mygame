var express = require('express');
var morgan = require('morgan');
var app = express();
var mongoose = require('mongoose');

//app settings
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/www'));
console.log('static files: ' + __dirname + '/www');
app.use(morgan('dev'));


//initialize DB Connection
var dbURI = 'mongodb://localhost/mygame';
var opts = {
    server: {
        socketOptions: {
            keepalive: 1
        }
    }
};

mongoose.connect(dbURI, opts);

mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbURI);
});

mongoose.connection.on('error', function () {
    console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnceted', function () {
    console.log('Mongoose default connection disconnected');
});

var playerSchema = mongoose.Schema({
    name: String
});

var player = mongoose.model('player', playerSchema);

player.find(function (err, players) {
    if (err) return console.error(err);

    if (players.length > 0) {
        console.log(players);
    } else {
        console.log('adding first record to DB');
        var firstPlayer = new player({
            name: "Bill"
        });

        firstPlayer.save(function (err, firstPlayer) {
            if (err) return console.error(err);
        });
    }
});

//apis
app.get('/api/players', function (req, res) {
    player.find(function (err, players) {
        if (err) return console.error(err);

        res.json(players);
    });
});


//routes
app.get('/', function (req, res) {
    res.sendFile('home.html', {
        root: __dirname + '/www/',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    }, function (err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
    });
});

//custom 404 page
//app.use(function (req, res) {
  //  res.status(404);
    //res.send('<p> 404 NOT FOUND</p>')
//});

//custom 500 page
app.use(function (err, req, res, next) {
    res.status(500);
    res.send('<p> 500 - WHY DO BAD THINGS HAPPEN?? </p>')
});

//start the app
app.listen(app.get('port'), function () {
    console.log('Express started: ' + app.get('port') + '; press Ctrl-c to terminate.');
});