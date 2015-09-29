'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    ExperimentSchema = mongoose.model('ExperimentSchema');

/**
 * List of Experiment schemas
 */
exports.list = function(req, res) {

    ExperimentSchema.find({}, function(err, schemas) {

        if (err) {
            res.json(500, {error: err.message});
        } else {
            res.json(200, schemas);
        }
    });
};

/**
 * Build a random experiment from a random ExperimentSchema
 */
exports.random = function(req, res) {

    function errorHandler(err) {
        res.json(500, {error: err.message});
    }

    ExperimentSchema.count({}, function(err, count) {

        if (err) {
            return errorHandler(err);
        } else if (count < 1) {
            return errorHandler(new Error('No experiment schemas in' +
                ' database.'));
        } else {

            // Get a random number from [0, number of schema)
            var rand = Math.floor(Math.random() * count);

            // Get a random schema
            ExperimentSchema.find({})
                .skip(rand)
                .limit(1)
                .populate('mediaPool', 'artist title label')
                .exec(function(err, schema) {

                    if (err) {
                        return errorHandler(err);
                    }

                    // Using the controller, build an experiment from this
                    // schema
                    schema[0].buildExperiment(function(err, builtExperiment) {

                        // Send the response
                        res.status(200).json(builtExperiment);
                    });
                });
        }
    });
};