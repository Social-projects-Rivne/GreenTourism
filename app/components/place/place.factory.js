'use strict';

angular.module('greenTourism')
.factory('placeModel', function() {
  var placeModel = {};

    placeModel.setPlacesArray = function(arr) {
      placeModel.placesArray = arr;
      return placeModel.placesArray;
    };

  return placeModel;
});