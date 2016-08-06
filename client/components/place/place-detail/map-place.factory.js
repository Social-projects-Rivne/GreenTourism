angular.module('mapPlaceModule',[])
  .factory('mapPlaceFactory', ['constants', function(constants) {
    var mapPlaceFactory = {};
    var map;

    mapPlaceFactory.showMap = function() {
      map = L.map('map1', {
        center: constants.mapCenter,
        zoom: constants.defaultZoom-8
      });
      return map;
    };
    return mapPlaceFactory;
  }]);
