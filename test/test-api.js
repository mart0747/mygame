var rest = require('restler');
var expect = require('chai').expect;

var base = 'http://localhost:3000';

describe('GET players', function () {
    it('invalid API route should return 404', function (done) {
        rest.get(base + '/api/invalidroute').on('complete', function (result, response) {
            expect(response.statusCode).to.equal(404);
            done();
        });
    });

    it('GET to the correct route should return 200 (Success)', function (done) {
        rest.get(base + '/api/players').on('complete', function (result, response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});

describe('Add Players', function () {

    var playerNoUserName = {
        name: 'steve'
    };

    it('POST new player without username should return an error 403', function (done) {
        rest.post(base + '/api/player', {
            data: playerNoUserName
        }).on('complete', function (result, response) {
            expect(response.statusCode).to.equal(403);
            done();
        });
    });

    var playerGood = {
        name: 'coolio',
        username: Math.random().toString(36).substr(2, 9)
    };

    it('POST new player with unique username should return 200 (Success) ', function (done) {
        rest.post(base + '/api/player', {
            data: playerGood
        }).on('complete', function (result, response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('POST new player with non unique username should return error 403', function (done) {
        rest.post(base + '/api/player', {
            data: playerNoUserName
        }).on('complete', function (result, response) {
            expect(response.statusCode).to.equal(403);
            done();

        });
    });
});