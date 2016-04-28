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

    it('GET to the correct route should return 300', function (done) {
        rest.get(base + '/api/players').on('complete', function (result, response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});

describe('Add Players', function () {

    var player = {
        name: 'stave'
    };

    it('Post new player should return json', function (done) {
        rest.post(base + '/api/player', {
            data: player
        }).on('complete', function (result, response) {
            expect(response.statusCode).to.equal(200)
            done();
        })
    });
})