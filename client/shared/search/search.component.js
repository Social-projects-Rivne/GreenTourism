angular.module('searchPlace',['ui.bootstrap'])
  .component('searchPlace', {
    templateUrl: 'shared/search/search.template.html',
    controller: ['Search', 'Track', '$scope', 'placesOnMap', '$timeout', 'mapFactory', '$compile', function SearchCtrl(Search, Track, $scope, placesOnMap, $timeout, mapFactory, $compile) {
      $scope.loading = false;
      $scope.noResults = false;
      $scope.minchars = false;
      var searchBy = 'place';
      this.searchPlace = function(searchname) {
        angular.element( document.querySelector( '#searchPlaces' ) ).empty();
        if(searchname.length>=3)
        {
        $scope.loading = true;
        Search.getList({name: [searchname], searchBy: [searchBy]}).then(function(resultPlaces) {
          $scope.loading = true;
          placesOnMap.removePlaces();
          placesOnMap.showPlaces(resultPlaces);
          showSearchResault(resultPlaces);
          searchBy = 'track';
          Search.getList({name: [searchname], searchBy: [searchBy]}).then(function(resultTracks) {
            placesOnMap.removeAllTracks();
            placesOnMap.showTracks(resultTracks);
            $scope.loading = false;
            console.log(resultTracks);
            searchBy = 'place';
            if(resultPlaces.length==0&&resultTracks.length==0)
              $scope.noResults = true;
          });
        });
      }
        else{
        $scope.minchars = true;
        return [];
        }
    }

      function showMarker(place){
        console.log("dsgsdgsdg");
       // mapFactory.setView([place.location.coordinates[1],
          //place.location.coordinates[0]]);
      }
      function showSearchResault(resultPlaces){

        var strResult="";
        strResult+="<h2>Search resault:</h2>";
        strResult+="<ul class='list-unstyled'>";
        resultPlaces.forEach(function(place) {
          strResult+="<li><a ng-mouseover='showMarker(place.id)' href='#!/places/"+place.id+"'>"+place.name+"</a></li>";
        });
        strResult+="</ul>";
        angular.element( document.querySelector( '#searchPlaces' ) ).append($compile(strResult)($scope));
      }

      angular.element(document).ready(function () {
        angular.element(document).on('click', function () {

          $timeout(function(){
            $scope.noResults = false;
            $scope.minchars = false;
          },5000)

        // angular.element( document.querySelector( '.err' ) ).addClass('transparent');
         $scope.$apply();
        });

      });
    }]
  });