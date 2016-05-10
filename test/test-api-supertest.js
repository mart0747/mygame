var request = require('supertest');
var app = require('../webserver').getApp;

var playerNoUserName = {
    name: 'steve'
};

var playerGood = {
    name: 'coolio',
    username: Math.random().toString(36).substr(2, 9)
};

var id;

describe('Add Players', function () {
    it('should respond with a 200 with no query parameters',
        function (done) {
            request(app)
                .get('/')
                .expect('Content-Type', /html/)
                .expect(200, done);
        });

    it('POST new player without username should return an error 403',
        function (done) {
            request(app)
                .post('/api/player')
                .send(playerNoUserName)
                .type('form')
                .expect(403, done);
        });

    it('POST new player with unique username should return 200 (Success) ',
        function (done) {
            request(app)
                .post('/api/player')
                .send(playerGood)
                .type('form')
                .expect(200)
                .end(function (err, res) {
                    id = res.body.id; //save id so we can delete it later.   
                    done();
                });
        });

    it('POST new player with non unique username should return error 403',
        function (done) {
            request(app)
                .post('/api/player')
                .send(playerGood)
                .type('form')
                .expect(403, done);
        });
});

describe('Delete Player', function () {
    it('Delete player with invalid ID should return 403', function (done) {
        request(app)
            .delete('/api/player/' + id + 'BAD')
            .type('form')
            .expect(403, done);
    });

    it('Delete the player that was successfully added', function (done) {
        request(app)
            .delete('/api/player/' + id)
            .type('form')
            .expect(200, done);
    });
});


/*
var rest = require('restler');
var expect = require('chai').expect;


var id;

var playerNoUserName = {
    name: 'steve'
};

var playerGood = {
    name: 'coolio',
    username: Math.random().toString(36).substr(2, 9)
};

describe('Add Players', function () {

    


    
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
});
*/