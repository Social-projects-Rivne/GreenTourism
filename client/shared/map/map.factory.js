angular.module('mapModule', [])
  .factory('mapFactory', ['Track', 'constants', function(Track, constants) {
    var mapFactory = {};
    var map;
    var userLocation;
    var popularTracks = [];
    mapFactory.showMap = function() {
      map = L.map('map', {
        center: constants.mapCenter,
        zoom: constants.defaultZoom
      });

      if (userLocation) {
        locationArea(userLocation);
        getPopularTracks();
      } else {
        map.locate({setView: true, maxZoom: constants.defaultZoom});
      }

      function getPopularTracks() {
        Track.getList({location: [userLocation.lat, userLocation.lng], radius: constants.radiusForPopularItems}).then(function(result) {
            popularTracks = result;
            mapFactory.popularTracks = popularTracks;
          });
      }

      function locationArea(coords) {
        if (userLocation) {
          map.setView(coords, constants.defaultZoom);
        }
      }

      function onLocationFound(e) {
        var coords = e.latlng;
        locationArea(coords);
        userLocation = coords;
        getPopularTracks();
      }

      map.on('locationfound', onLocationFound);
      mapFactory.map = map;
      mapFactory.userLocation = userLocation;
      return map;
    };

    return mapFactory;
  }]);
