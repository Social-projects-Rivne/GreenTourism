angular.module('mapModule', [])
  .factory('mapFactory', function() {
    var mapFactory = {};
    var map;
    var userLocation;

    mapFactory.showMap = function() {
      map = L.map('map', {
        center: [50.6234, 26.2189],
        zoom: 14
      });

      if (!userLocation) {
        map.locate({setView: true, maxZoom: 14});
      } else {
        locationArea(userLocation);
      }

      function locationArea(coords) {
        if (userLocation) {
          map.setView(coords, 14);
        }
      }

      function onLocationFound(e) {
        locationArea(e.latlng);
        userLocation = e.latlng;
        console.log(userLocation);
      }

      map.on('locationfound', onLocationFound);
      mapFactory.map = map;
      return map;
    };

    return mapFactory;
  });
