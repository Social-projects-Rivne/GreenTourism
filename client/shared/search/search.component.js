angular.module('searchPlace',['ui.bootstrap'])
  .component('searchPlace', {
    templateUrl: 'shared/search/search.template.html',
    controller: ['Search', 'Track', '$scope', 'placesOnMap', '$timeout', 'mapFactory', '$compile', 'Place', '$rootScope', function SearchCtrl(Search, Track, $scope, placesOnMap, $timeout, mapFactory, $compile, Place, $rootScope) {
      var ctrl=this;
      $scope.loading = false;
      $scope.noResults = false;
      $scope.minchars = false;
      var searchBy = 'place';
      $scope.showMarker=function(lat,lon){
       //alert(lat+" "+lon);
        $rootScope.stopFlag=true;
        $timeout( function(){
          mapFactory.map.setView([lat, lon]);
        }, 100);

       // console.log(mapFactory.map._layers[131]._latlng.lat);
      /*
        L.marker([lat, lon], {
          icon: L.icon({
            iconUrl: 'assets/img/places/marker/red.png',
            shadowUrl: 'assets/img/places/marker/marker-shadow.png',
            iconSize: [55, 61],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
            zIndexOffset: 100000
          })
        }).addTo(mapFactory.map);*/
        console.log(ctrl.markers);
        ctrl.markersarr= _.filter(ctrl.markers, function(marker) { return marker._latlng.lat==lat ; });

        //ctrl.markersarr =ctrl.markers.filter(function(marker) {
           // return (marker.lat==lat && marker.lng==lon);
         // }
        //);
        console.log( ctrl.markersarr);
      }
      this.searchPlace = function(searchname) {
        angular.element( document.querySelector( '#searchPlaces' ) ).empty();
        if(searchname.length>=3)
        {
        $scope.loading = true;
        Search.getList({name: [searchname], searchBy: [searchBy]}).then(function(resultPlaces) {
          $scope.loading = true;
          placesOnMap.removePlaces();
          ctrl.markers=placesOnMap.showPlaces(resultPlaces);
          showSearchResault(resultPlaces);
          searchBy = 'track';
          Search.getList({name: [searchname], searchBy: [searchBy]}).then(function(resultTracks) {
            placesOnMap.removeAllTracks();
            placesOnMap.showTracks(resultTracks);
            $scope.loading = false;
           // console.log(resultTracks);
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


      function showSearchResault(resultPlaces){

        var strResult="";
        strResult+="<h2>Search resault:</h2>";
        strResult+="<ul class='list-unstyled'>";
        resultPlaces.forEach(function(place) {
          var lat=place.location.coordinates[1];
          var lon=place.location.coordinates[0];
          strResult+="<li><a ng-mouseover='showMarker("+lat+","+lon+")' href='#!/places/"+place.id+"'>"+place.name+"</a></li>";
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