angular.module('popularTracks', [])
  .component('popularTracks', {
    templateUrl: 'components/place/popular-tracks/popular-tracks.template.html',
    controller: ['Track', 'mapFactory', function popularTracksController(Track, mapFactory) {
      var ctrl = this;
      ctrl.popularTracks = [];
      var userLocation;
      var locationFound = false;
      var allTrackIsRecived = false;

      if (mapFactory.popularTracks) {
        ctrl.popularTracks = mapFactory.popularTracks;
        console.log(ctrl.popularTracks);
      } else {
        Track.getList().then(function(result) {
          allTrackIsRecived = true;
          ctrl.popularTracks = result;
          if (locationFound) {
            getPopularTracks();
          }
          console.log(result);
        });
        mapFactory.map.on('locationfound', onLocationFound);
      }

      function onLocationFound(e) {
        locationFound = true;
        userLocation = e.latlng;
        if (allTrackIsRecived) {
          getPopularTracks();
        }
      }

      function getPopularTracks() {
        Track.getList({location: [userLocation.lng, userLocation.lat], radius: 5000}).then(function(result) {
          ctrl.popularTracks = result;
          console.log(result);
        });
      }
    }]
  });
