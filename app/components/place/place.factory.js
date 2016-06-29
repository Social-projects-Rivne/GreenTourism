'use strict';

angular.module('greenTourism')
  .factory('placeModel', function($resource) {
    var placeModel = {};

    placeModel.getPlaceList = $resource('components/place/place.data.json', {}, {
      'query': {
        method: 'GET',
        isArray: true
      }
    });
    placeModel.getPlaceTypes = $resource('components/place/types.data.json', {}, {
      'query': {
        method: 'GET',
        isArray: true
      }
    });
    placeModel.getOnePlace = $resource('components/place/place1.data.json', {}, {
      'query': {
        method: 'GET',
        isArray: true
      }
    });
    var placesArray = {};
    placeModel.setPlacesArray = function(arr) {
      placeModel.placesArray = arr;
      return placeModel.placesArray;
    };
    placeModel.getPlacesArray = function() {
      return placeModel;
    };

    return placeModel;
  });
