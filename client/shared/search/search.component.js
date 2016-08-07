angular.module('searchPlace',['ui.bootstrap'])
  .component('searchPlace', {
    templateUrl: 'shared/search/search.template.html',
    controller: ['Search', 'Track', '$scope', 'placesOnMap', '$timeout', 'mapFactory', '$compile', 'Place', '$rootScope',
      function SearchCtrl(Search, Track, $scope, placesOnMap, $timeout, mapFactory, $compile, Place, $rootScope) {
      var ctrl=this;
      $rootScope.stopFlag=true;
      $scope.loading = false;
      $scope.noResults = false;
      $scope.minchars = false;
      var searchBy = 'place';

      $scope.showMarker=function(lat,lon){

          var newIcon = L.icon({
          iconUrl: "assets/img/places/marker/search.png",
          iconSize: [50, 60],
          iconAnchor: [8, 8],
          popupAnchor: [0, 0],
          shadowUrl: "assets/img/places/marker/marker-shadow_search.png",
          shadowSize: [70, 60],
          shadowAnchor: [-15, 6]
        });



        //var M= placesOnMap.groupClusters._featureGroup._map._layers;
       //console.log(placesOnMap.groupClusters._featureGroup._map._layers);
       // console.log(mapFactory.map);

        ctrl.markernew= _.filter(ctrl.markers, function(marker) {
          return marker._latlng.lat==lat&&marker._latlng.lng==lon;
        });
        if(ctrl.markernew){
            if(ctrl.markerOld){
              var oldIcon = ctrl.markernew[0].options.icon;
              ctrl.markerOld[0].setIcon(oldIcon);
            }
            ctrl.markerOld=ctrl.markernew;
            ctrl.markernew[0].setIcon(newIcon);
          $timeout(function(){
            mapFactory.map.panTo(new L.LatLng(lat, lon), animate=true);}, 1);
        }
       // var myLayer = L.layerGroup(ctrl.markernew).eachLayer(function(layer){console.log(layer);});
        ctrl.layer= _.filter(placesOnMap.groupClusters._layers, function(layer) {
          return layer._latlng.lat==lat&&layer._latlng.lng==lon;
        });

        //console.log(placesOnMap.groupClusters);
        //var visibleOne = markers.getVisibleParent(ctrl.markernew);
        //console.log(visibleOne.getLatLng());
        for (i in markersSubArray) {
          markersSubArray[i].refreshIconOptions(newOptionsMappingArray[i]);
        }
        markers.refreshClusters(markersSubArray);




        placesOnMap.groupClusters.on('clusterclick', function (a) {
          // a.layer is actually a cluster
          console.log('cluster ' + a.layer.getAllChildMarkers().length);
        });
       // var visibleOne = placesOnMap.groupClusters.getVisibleParent(ctrl.markernew);
       // console.log(visibleOne.getLatLng());
        placesOnMap.groupClusters.refreshClusters(ctrl.markernew);

        //var visibleOne = placesOnMap.markerClusterGroup.getVisibleParent(ctrl.markernew);
        //console.log(visibleOne.getLatLng());
};
      angular.element(document.querySelector("body")),angular.element(document.querySelector("#map")).on('mousedown', function(){
        if(ctrl.markersarr){
          $timeout( function(){
            ctrl.markersarr[0].setIcon(oldIcon);
          }, 200);

        }
      });
      this.searchPlace = function(searchname) {
        angular.element( document.querySelector( '#searchPlaces' ) ).empty();
        if(searchname.length>=3)
        {
        $rootScope.hideSearchPlaces=false;
          $rootScope.$apply();
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
         $scope.$apply();
        });

      });
    }]
  });