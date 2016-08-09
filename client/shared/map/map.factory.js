angular.module('mapModule', [])
  .factory('mapFactory', ['Track', 'constants', function(Track, constants) {
    var mapFactory = {};
    var map;
    mapFactory.showMap = function() {
      map = L.map('map', {
        center: constants.mapCenter,
        zoom: constants.defaultZoom,
        minZoom: 2,
        maxZoom: 18,
        worldCopyJump: true
      });

      if (mapFactory.userLocation) {
        map.setView(mapFactory.userLocation, constants.defaultZoom);
      } else {
        map.locate({setView: true, maxZoom: constants.defaultZoom});
      }

      function onLocationFound(e) {
        var coords = e.latlng;
        mapFactory.userLocation = coords;
      }

      map.on('locationfound', onLocationFound);
      mapFactory.map = map;
      return map;
    };

    return mapFactory;
  }]);
