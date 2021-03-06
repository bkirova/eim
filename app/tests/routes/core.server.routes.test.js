'use strict';

// Helper modules
var config = require('../../../config/config');

// Test helpers
var request = require('supertest');

describe('Routes: Core', function() {
    before(function() {
       request = request('localhost:' + config.port);
    });

    describe('/', function() {
        describe('GET', function() {
            it('should respond with HTML', function(done) {
                request
                    .get('/')
                    .expect('Content-Type', /text\/html/)
                    .expect(200, done);
            });
        });
    });

    describe('/api/nodeenv', function() {
        describe('GET', function() {
            it('should respond with HTML', function(done) {
                request
                    .get('/api/nodeenv')
                    .expect('Content-Type', /application\/json/)
                    .expect(200, done);
            });

            it('should give the Node environment', function(done) {
                request
                    .get('/api/nodeenv')
                    .expect({ env: process.env.NODE_ENV })
                    .expect(200, done);
            });
        });
    });

    describe('/api/config', function() {
        describe('GET', function() {
            it('should respond with HTML', function(done) {
                request
                    .get('/api/config')
                    .expect('Content-Type', /application\/json/)
                    .expect(200, done);
            });

            it('should give the custom configuration', function(done) {
                var customConfig = require('../../../config/config').customConfiguration;

                request
                    .get('/api/config')
                    .end(function(err, res) {
                        if (err) {
                            return done(err);
                        } else {
                            res.body.should.eql(customConfig);
                            done();
                        }
                    });
            });
        });
    });
});