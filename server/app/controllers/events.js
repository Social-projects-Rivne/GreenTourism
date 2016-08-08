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

    var id = req.query.id;
    delete req.query.id;

    var findDb = function(searchString){
        return Event.find(searchString,
            function (err, records) {
                if (err) {
                    res.status(400).json(err);
                } else {
                    res.json(records);
                }
            });
    } ;

    if (search) {
        findDb({$or:
            [
                {name: {
                    $regex: search,
                    $options: 'i'
                }},
                {description: {
                    $regex: search,
                    $options: 'i'
                }}
            ]
        }) ;
        return ;
    };

    if (id) {
        findDb({_id: id});
        return ;
    } ;

    if (From) {
        findDb({dateStart: {$gte: From}, dateEnd: {$lte: To}});
        return ;
    } ;

    findDb(queryAndOptions.query, null, queryAndOptions.options) ;

};

exports.create = defaultController.create;

exports.getById = defaultController.getById;

exports.show = defaultController.show;

exports.update = defaultController.update;

exports.delete = defaultController.delete;
