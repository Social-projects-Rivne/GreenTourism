exports.find = function(res) {
  return function(err, records) {
    if (err) {
      return res.status(400).json(err);
    }

    return res.json(records);
  };
};
