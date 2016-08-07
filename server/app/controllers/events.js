var Event = require('mongoose').model('Event');
var defaultController = require('./default-crud-controller')(Event);
var sliceQueryOptions = require('../helpers/slice-query-options');

exports.list = function(req, res) {
    var queryAndOptions = sliceQueryOptions(req.query);

    var From = req.query.From;
    delete req.query.From;

    var To = req.query.To;
    delete req.query.To;

    var search = req.query.search;
    delete req.query.search;

    if (search) {
            Event.find({
                    $or: [
                        {name: {
                            $regex: search,
                            $options: 'i'
                        }},
                        {description: {
                            $regex: search,
                            $options: 'i'
                        }}
                    ]
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
            if (From) {
              //  Event.find({ dateStart: {$lte : From },dateEnd : {$gte : To }}
                Event.find({ dateStart: {$gte : From }, dateEnd: {$lte : To }}
                , function (err, records) {
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