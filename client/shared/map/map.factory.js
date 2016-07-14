angular.module('mapModule', [])
  .factory('mapFactory', function() {
    var mapFactory = {};
    var map;
    mapFactory.showMap = function() {
      map = L.map('map', {
        center: [50.6234, 26.2189],
        zoom: 14
      });
      mapFactory.map = map;
      return map;
    };

      /* $rootScope.map.locate({setView: true, maxZoom: 14});

      function onLocationFound(e) {

          L.marker(e.latlng).addTo($rootScope.map)
              .bindPopup("You are here").openPopup();

          $rootScope.userLocationArea = L.circle(e.latlng, 3000).addTo($rootScope.map);
      }

      $rootScope.map.on('locationfound', onLocationFound);*/
    return mapFactory;
  });
