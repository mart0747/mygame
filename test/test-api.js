var rest = require('restler');
var expect = require('chai').expect;

var base = 'http://localhost:3000';
var id;

var playerNoUserName = {
    name: 'steve'
};

var playerGood = {
    name: 'coolio',
    username: Math.random().toString(36).substr(2, 9)
};

describe('Add Players', function () {

    it('POST new player without username should return an error 403', function (done) {
        rest.post(base + '/api/player', {
            data: playerNoUserName
        }).on('complete', function (result, response) {
            expect(response.statusCode).to.equal(403);
            done();
        });
    });


    it('POST new player with unique username should return 200 (Success) ', function (done) {
        rest.post(base + '/api/player', {
            data: playerGood
        }).on('complete', function (result, response) {
            expect(response.statusCode).to.equal(200);
            expect(result.id).to.be.a('string');
            id = result.id; //save the id so we can delete it later.
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

    it('Get with ID that does not exist should return error',
        function (done) {
            rest.get(base + '/api/player/' + id + 'BAD')
                .on('complete', function (result, response) {
                    expect(response.statusCode).to.equal(403);
                    done();
                });
        });

    it('Get with ID that exists should return success and found object should be returned',
        function (done) {
            rest.get(base + '/api/player/' + id).on('complete', function (result, response) {
                expect(response.statusCode).to.equal(200);
                expect(result.name).to.equal(playerGood.name);
                expect(result.username).to.equal(playerGood.username);
                done();
            });
        });
});

describe('Delete Player', function () {
    it('Delete player with invalid ID should return 403', function (done) {
        rest.del(base + '/api/player/' + id + 'BAD')
            .on('complete', function (result, response) {
                expect(response.statusCode).to.equal(403);
                done();
            });
    });

    it('Delete the player that was successfully added', function (done) {
        rest.del(base + '/api/player/' + id).on('complete', function (result, response) {
            expect(response.statusCode).to.equal(200);
            done();
        });

    });
});