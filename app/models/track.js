angular.module('greenTourism')
  .factory('Track', function($resource) {
    var Track = $resource('/api/tracks/:id');

    // Custom methods goes here

    return Track;
  });
