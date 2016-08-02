angular.module('searchPlace',['ui.bootstrap'])
  .component('searchPlace', {
    templateUrl: 'shared/search/search.template.html',
    controller: ['Search', 'Track', '$scope', 'placesOnMap', function SearchCtrl(Search, Track, $scope, placesOnMap) {
      $scope.loading = false;
      $scope.noResults = false;
      var searchBy = 'place';
      this.searchPlace = function(searchname) {
        $scope.loading = true;
        Search.getList({name: [searchname], searchBy: [searchBy]}).then(function(resultPlaces) {
          $scope.loading = true;
          placesOnMap.removePlaces();
          placesOnMap.showPlaces(resultPlaces);
          searchBy = 'track';
          Search.getList({name: [searchname], searchBy: [searchBy]}).then(function(resultTracks) {
            placesOnMap.removeAllTracks();
            placesOnMap.showTracks(resultTracks);
            $scope.loading = false;
            searchBy = 'place';
            if(resultPlaces.length==0&&resultTracks.length==0)
              $scope.noResults = true;
          });
        });
      }
      angular.element(document).ready(function () {
        angular.element(document).on('click', function () {
          $scope.noResults = false;
          $scope.$apply();
        });

      });
    }]
  });