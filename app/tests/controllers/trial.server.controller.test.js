'use strict';

/**
 * Module dependencies.
 */
var should = require('chai').should();

/**
 * Test helpers
 */
var rewire = require('rewire');
var sinon = require('sinon');
var httpMocks = require('node-mocks-http');
var fs = require('fs');

/**
 * Module under test
 */
var controller;

/**
 * Globals
 */
var req, res;

/**
 * Unit tests
 */
describe('Trial Controller', function() {
    beforeEach(function() {
        controller = rewire('../../controllers/trial.server.controller');
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
    });

    describe('create()', function() {
        it('should require metadata', function() {
            controller.create(req, res);
            var data = JSON.parse(res._getData());
            res.statusCode.should.equal(500);
            data.error.should.equal('No metadata.session_number property' +
                ' found.');
            data.request_body.should.eql({});
        });

        it('should require a session number', function() {
            req.body = { metadata: {} };
            controller.create(req, res);
            var data = JSON.parse(res._getData());
            res.statusCode.should.equal(500);
            data.error.should.equal('No metadata.session_number property' +
                ' found.');
            data.request_body.should.eql({ metadata: {} });
        });

        it('should require the session number to be a string', function() {
            req.body = { metadata: { session_number: 14 } };
            controller.create(req, res);
            var data = JSON.parse(res._getData());
            res.statusCode.should.equal(500);
            data.error.should.equal('No metadata.session_number property' +
                ' found.');
            data.request_body.should.eql({ metadata: { session_number: 14 } });
        });

        it('should write the stringified body to the correct location', function(done) {

            req.body = { metadata: { session_number: 'B42' } };
            var filePath = './trials/B42.trial.json';

            controller.create(req, res);

            //noinspection JSUnresolvedFunction
            fs.readFile(filePath, {encoding: 'utf8'}, function(err, contents) {

                var contentsJSON = JSON.parse(contents.toString());
                contentsJSON.should.eql(req.body);

                fs.unlink(filePath, done);
            });
        });

        it('should return a JSON error if there was an error while writing' +
            ' the file', function() {

            // Create body
            req.body = { metadata: { session_number: 'B42' } };

            // Mock fs.writeFile()
            var errorMessage = 'Error in writeFile()';
            var revert = controller.__set__('fs.writeFile', function(path, data, callback) {
                callback(new Error(errorMessage));
            });

            // Fire the request
            controller.create(req, res);

            // Check expectations
            res.statusCode.should.equal(500);

            var data = JSON.parse(res._getData());
            console.log(data);
            data.error.should.equal(errorMessage);

            // Revert changes to controller
            revert();
        });

        it('should return JSON success if the write was successful', function(done) {

            req.body = { metadata: { session_number: 'B42' } };
            var filePath = './trials/B42.trial.json';

            controller.create(req, res);

            //noinspection JSUnresolvedFunction
            fs.readFile(filePath, {encoding: 'utf8'}, function() {

                res.statusCode.should.equal(200);
                res._isJSON().should.equal(true);

                fs.unlink(filePath, done);
            });
        });
    });
});