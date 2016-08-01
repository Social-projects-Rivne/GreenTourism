module.exports = function(query) {
  var options = {
    limit: query.limit,
    skip: query.skip,
    sort: query.sort
  };

  delete query.limit;
  delete query.sort;
  delete query.skip;

  return {
    query: query,
    options: options
  };
};
