var express = require('express');
var morgan = require('morgan');
var app = express();

//
//app settings
//
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/www'));
console.log('static files: ' + __dirname + '/www');
app.use(morgan('dev'));

//
//routes
//
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
app.use(function (req, res) {
    res.status(404);
    res.send('<p> 404 NOT FOUND</p>')
});

//custom 500 page
app.use(function (err, req, res, next) {
    res.status(500);
    res.send('<p> 500 - WHY DO BAD THINGS HAPPEN?? </p>')
});

//start the app
app.listen(app.get('port'), function () {
    console.log('Express started: ' + app.get('port') + '; press Ctrl-c to terminate.');
});