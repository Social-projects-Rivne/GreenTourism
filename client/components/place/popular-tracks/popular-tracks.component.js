angular.module('popularTracks', [])
  .component('popularTracks', {
    templateUrl: 'components/place/popular-tracks/popular-tracks.template.html',
    controller: ['Track', 'mapFactory', function popularTracksController(Track, mapFactory) {
      var self = this;
      self.popularTracks = [];
      var userLocation;

      if (mapFactory.popularTracks) {
        self.popularTracks = mapFactory.popularTracks;
      } else {
        Track.getList().then(function(result) {
          self.popularTracks = result;
        });
        mapFactory.map.on('locationfound', onLocationFound);
      }

      function onLocationFound(e) {
        userLocation = e.latlng;
        getPopularTracks();
      }

      function getPopularTracks() {
        Track.getList({location: [userLocation.lat, userLocation.lng], radius: 5000}).then(function(result) {
          self.popularTracks = result;
        });
      }
    }]
  });
