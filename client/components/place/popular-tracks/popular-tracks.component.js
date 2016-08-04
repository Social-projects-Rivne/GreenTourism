angular.module('popularTracks', [])
  .component('popularTracks', {
    templateUrl: 'components/place/popular-tracks/popular-tracks.template.html',
    controller: ['Track', 'mapFactory', 'constants', function popularTracksController(Track, mapFactory, constants) {
      var ctrl = this;
      ctrl.popularTracks = [];
      var userLocation;
      var locationFound = false;
      var allTrackRecived = false;

      if (mapFactory.popularTracks) {
        ctrl.popularTracks = mapFactory.popularTracks;
      } else {
        Track.getList().then(function(result) {
          allTrackRecived = true;
          ctrl.popularTracks = result;
          mapFactory.popularTracks = result;
          if (locationFound) {
            getPopularTracks();
          }
        });
        mapFactory.map.on('locationfound', onLocationFound);
      }

      function onLocationFound(e) {
        locationFound = true;
        userLocation = e.latlng;
        if (allTrackRecived) {
          getPopularTracks();
        }
      }

      function getPopularTracks() {
        Track.getList({location: [userLocation.lng, userLocation.lat], radius: constants.radiusForPopularItems}).then(function(result) {
          if (result.length > 0) {
            ctrl.popularTracks = result;
            mapFactory.popularTracks = result;
          }
        });
      }
    }]
  });
