exports.find = function(response, Model, query, projection, callback) {
  var options = {
    limit: query.limit,
    skip: query.skip,
    sort: query.sort
  };

  delete query.limit;
  delete query.sort;
  delete query.skip;

  callback = callback || function(err, records) {
    if (err) {
      return response.status(400).json(err);
    }

    return response.json(records);
  };

  Model.find(query, projection, options, callback);
};

exports.findById = function(response, Model, id, projection, callback) {
  callback = callback || function(err, record) {
    if (err) {
      return response.status(404).json(err);
    }

    return response.json(record);
  };

  Model.findById(id, projection, callback);
};

exports.insert = function(response, Model, body, callback) {
  var record = new Model(body);

  callback = callback || function(err) {
    if (err) {
      return response.status(400).json(err);
    }

    return response.status(201).json({
      message: 'Record was successfully created!',
      record: record
    });
  };

  record.save(callback);
};

exports.update = function(response, Model, id, body, callback) {
  callback = callback || function(err, record) {
    if (err) {
      return response.status(400).json(err);
    }

    for (var key in body) {
      if ({}.hasOwnProperty.call(body, key)) {
        record.set(key, body[key]);
      }
    }

    record.save(function(err) {
      if (err) {
        return response.status(400).json(err);
      }

      return response.json({
        message: 'Record ' + id + ' was successfully updated',
        record: record
      });
    });
  };

  Model.findById(id, callback);
};

exports.remove = function(response, Model, id, callback) {
  callback = callback || function(err) {
    if (err) {
      return response.status(400).json(err);
    }

    return response.json({
      message: 'Record ' + id + ' was successfully deleted'
    });
  };

  Model.findByIdAndRemove(id, callback);
};
