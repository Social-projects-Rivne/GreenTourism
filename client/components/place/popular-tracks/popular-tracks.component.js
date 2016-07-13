angular.module('popularTracks', [])
  .component('popularTracks', {
    templateUrl: 'components/place/popular-tracks/popular-tracks.template.html',
    controller: ['$scope', 'Track', 'mapFactory', function popularTracksController($scope, Track, mapFactory) {
      var userLocation;
      var self = this;
      self.popularTracks = [];
      var getPopularTracks = function() {
        Track.getList({location: [userLocation.lat, userLocation.lng]}).then(function(result) {
          self.popularTracks = result;
        });
      };
      function onLocationFound(e) {
        userLocation = e.latlng;
        getPopularTracks();
      }
      mapFactory.map.on('locationfound', onLocationFound);
    }]
  });
