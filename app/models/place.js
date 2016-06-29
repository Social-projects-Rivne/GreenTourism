angular.module('greenTourism')
  .factory('Place', function($resource) {
    var Place = $resource('/api/places/:id');

    // Custom methods goes here

    return Place;
  });
