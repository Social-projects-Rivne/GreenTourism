angular.module('mapModule', [])
  .factory('mapFactory',['Track', function(Track) {
    var mapFactory = {};
    var map;
    var userLocation;
    var popularTracks = [];

    mapFactory.showMap = function() {
      map = L.map('map', {
        center: [50.6234, 26.2189],
        zoom: 14
      });

      if (userLocation) {
        locationArea(userLocation);
        getPopularTracks();
      } else {
        map.locate({setView: true, maxZoom: 14});
      }

      function getPopularTracks() {
        Track.getList({location: [userLocation.lat, userLocation.lng]}).then(function(result) {
          popularTracks = result;
          mapFactory.popularTracks = popularTracks;
        });
      };

      function locationArea(coords) {
        if (userLocation) {
          map.setView(coords);
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
