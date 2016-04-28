var express = require('express');
var morgan = require('morgan');
var app = express();
var mongoose = require('mongoose');

//app settings
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/www'));
console.log('static files: ' + __dirname + '/www');
app.use(morgan('dev'));
app.use(require('body-parser').urlencoded({extended:true}));

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

var Players = mongoose.model('player', playerSchema);

Players.find(function (err, playersInDB) {
    if (err) return console.error(err);

    if (playersInDB.length > 0) {
        console.log(playersInDB);
    } else {
        console.log('adding first record to DB');
        var firstPlayer = new Players({
            name: "Bill"
        });

        firstPlayer.save(function (err, firstPlayer) {
            if (err) return console.error(err);
        });
    }
});

//apis
app.get('/api/players', function (req, res) {
    Players.find(function (err, playersInDB) {
        if (err) return console.error(err);

        res.json(playersInDB);
    });
});

app.post('/api/player', function (req, res) {
    var newPlayer = new Players({
        name: req.body.name
    });

    newPlayer.save(function (err, np) {
        if (err) return res.status(500).send('Database Error');
        
        res.json({id: np._id});
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

//start the app
app.listen(app.get('port'), function () {
    console.log('Express started: ' + app.get('port') + '; press Ctrl-c to terminate.');
});