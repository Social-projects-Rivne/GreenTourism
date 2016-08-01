var Event = require('mongoose').model('Event');
var defaultController = require('./default-crud-controller')(Event);
var sliceQueryOptions = require('../helpers/slice-query-options');

exports.list = function(req, res) {
    var queryAndOptions = sliceQueryOptions(req.query);

    var location = req.query.location;
    delete req.query.location;

    var radius = req.query.radius;
    delete req.query.radius;

    var search = req.query.search;
    delete req.query.search;

    if (search) {
            Event.find({
                    name: {
                        $regex: search,
                        $options: 'i'
                    }
                },
            function (err, records) {
            console.log('search >> '+search) ;
            if (err) {
                res.status(400).json(err);
            } else {
                res.json(records);
            }
        });
    }
    else
        {
            if (location) {
                Event.find({
                    location: {
                        $near: {
                            $geometry: {
                                type: 'Point',
                                coordinates: location
                            },
                            $maxDistance: radius,
                            $minDistance: 0
                        }
                    }
                }, function (err, records) {
                    if (err) {
                        res.status(400).json(err);
                    } else {
                        res.json(records);
                    }
                });
            } else {
                Event.find(queryAndOptions.query, null, queryAndOptions.options,
                    function (err, records) {
                        if (err) {
                            res.status(400).json(err);
                        } else {
                            res.json(records);
                        }
                    }
                );
            }
        }
};

exports.create = defaultController.create;

exports.getById = defaultController.getById;

exports.show = defaultController.show;

exports.update = defaultController.update;

exports.delete = defaultController.delete;