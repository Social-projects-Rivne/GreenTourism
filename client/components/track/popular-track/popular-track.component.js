angular.module('popularTrack', [])
  .component('popularTrack', {
    templateUrl: 'components/track/popular-track/popular-track.template.html',
    controller: ['$http', '$rootScope', function popularTrackController($http, $rootScope) {
      var popularTrackScope = this;
      popularTrackScope.search = '';

      $http.get('components/track/tracks.data.json').then(function(data) {
        popularTrackScope.tracks = data.data;

        console.log($rootScope.tracks[0][0]._latlngs);
      }, function() {
        console.log('failed tracks fetching!');
      });

      console.log($rootScope.userLocationArea);
    }]
  }).filter('popularTrackFilter', ['$filter', function($filter) {
    return function(tracks, search) {
      var input = tracks;
      var output = [];
      var index;
      if (search == '') {
        output = $filter('orderBy')(tracks, 'track_rate', true);
        return output;
      } else {
        output = $filter('filter')(tracks, search);
        return output;
      }
    };
  }]);
