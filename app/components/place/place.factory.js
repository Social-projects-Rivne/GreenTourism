'use strict';

angular.module('greenTourism')
.factory('placeModel', function() {
  var placeModel = {};

    placeModel.setPlacesArray = function(arr) {
      placeModel.placesArray = arr;
      console.log(placeModel.placesArray);
      return placeModel.placesArray;
    };

  return placeModel;
});