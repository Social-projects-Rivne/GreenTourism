angular.module('searchModel', ['restangular'])
  .factory('Search', ['Restangular', function Search(Restangular) {
    var Search = Restangular.service('search');

    // Custom methods goes here

    return Search;
  }]);