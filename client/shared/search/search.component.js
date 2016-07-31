angular.module('searchPlace',['ui.bootstrap'])
  .component('searchPlace', {
    templateUrl: 'shared/search/search.template.html',
    controller: ['Search', 'Track', '$scope', 'placesOnMap', function SearchCtrl(Search, Track, $scope, placesOnMap) {
      $scope.loading = false;
      var searchBy = 'place';
      this.searchPlace = function(searchname) {
        Search.getList({name: [searchname], searchBy: [searchBy]}).then(function(result) {
          $scope.loading = true;
          placesOnMap.removePlaces();
          placesOnMap.showPlaces(result);
          $scope.loading = false;
          searchBy = 'track';
          Track.getList({name: [searchname], searchBy: [searchBy]}).then(function(result) {
            placesOnMap.removeTracks();
            placesOnMap.showTracks(result);
            console.log(result);
          });
        });
      }
    }]
  });