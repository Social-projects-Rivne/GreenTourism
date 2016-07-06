angular.module('greenTourism')
  .factory('Track', ['Restangular', function Track(Restangular) {
    var Track = Restangular.service('tracks');

    // Custom methods goes here

    return Track;
  }]);
