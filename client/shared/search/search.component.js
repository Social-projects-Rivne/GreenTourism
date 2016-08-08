angular.module('searchPlace', ['ui.bootstrap'])
  .component('searchPlace', {
    templateUrl: 'shared/search/search.template.html',
    controller: ['Search', 'Track', '$scope', 'placesOnMap', '$timeout', 'mapFactory', '$compile', 'Place', '$rootScope',
      function SearchCtrl(Search, Track, $scope, placesOnMap, $timeout, mapFactory, $compile, Place, $rootScope) {
        var ctrl = this;
        markers = [];

        $scope.loading = false;
        $scope.noResults = false;
        $scope.minchars = false;
        var searchBy = 'place';
        var noname = 'http://homyachok.com.ua/images/noimage.png';

        $scope.showMarker = function(lat, lon, obj) {
          var newIcon = L.icon({
            iconUrl: "assets/img/places/marker/search.png",
            iconSize: [55, 70],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [51, 51],
            shadowUrl: "assets/img/places/marker/marker-shadow_search.png",
            shadowAnchor: [-10, 13]
          });
          angular.element(document.querySelector('.activeSearchResult')).removeClass('activeSearchResult');
          obj.target.className = "activeSearchResult";

          ctrl.markernew = _.filter(ctrl.markers, function(marker) {
            return marker._latlng.lat == lat && marker._latlng.lng == lon;
          });

          if (ctrl.markernew) {
            if (ctrl.markerOld) {
              var oldIcon = ctrl.markernew[0].options.icon;
              ctrl.markerOld[0].setIcon(oldIcon);
              ctrl.markerOld[0].setZIndexOffset(5000);
            }
            ctrl.markernew[0].setZIndexOffset(10000);
            ctrl.markerOld = ctrl.markernew;
            ctrl.markernew[0].setIcon(newIcon);

            $timeout(function() {
              mapFactory.map.panTo(new L.LatLng(lat, lon), animate = true);
              // mapFactory.map.setView([lat, lon], 6);
            }, 100);
          }
        };
        angular.element(document.querySelector("body")), angular.element(document.querySelector("#map")).on('mousedown', function() {
          if (ctrl.markersarr) {
            $timeout(function() {
              ctrl.markersarr[0].setIcon(oldIcon);
            }, 200);
          }
        });
        this.searchPlace = function(searchname) {
          if (ctrl.markers && ctrl.markers.length != 0) {
            for (i = 0; i < ctrl.markers.length; i++) {
              mapFactory.map.removeLayer(ctrl.markers[i]);
            }

          }
          angular.element(document.querySelector('#searchPlaces')).empty();
          if (searchname.length >= 3) {
            $scope.hideSearchPlaces = false;
            $scope.$emit('search', $scope.hideSearchPlaces);
            $scope.loading = true;
            Search.getList({name: [searchname], searchBy: [searchBy]}).then(function(resultPlaces) {
              ctrl.resultPlaces = resultPlaces;
              $scope.loading = true;
              searchBy = 'track';
              Search.getList({name: [searchname], searchBy: [searchBy]}).then(function(resultTracks) {
                ctrl.resultTracks = resultTracks;
                placesOnMap.removeTracks();
                placesOnMap.showTracks(resultTracks);
                $scope.loading = false;
                searchBy = 'place';
                if (ctrl.resultPlaces.length == 0 && ctrl.resultTracks.length == 0) {
                  $scope.noResults = true;
                  showSearchResault();
                }
                else {
                  placesOnMap.removePlaces();
                  ctrl.markers = showPlaces(ctrl.resultPlaces);
                  showSearchResault(ctrl.resultPlaces, ctrl.resultTracks);
                }
              });
            });
          }
          else {
            $scope.minchars = true;
            return [];
          }
        };
        function showSearchResault(resultPlaces, resultTracks) {
          var strResult = "<h2>Search resault:</h2>";
          if (!resultPlaces || !resultTracks)
            strResult += "<h3>There are no such places and tracks, try else please</h3>";
          else {
            if (ctrl.resultPlaces.length > 0) {
              resultPlaces = _.orderBy(resultPlaces, ['rate'], ['desc']);
              strResult += "<h3>Places</h3>";
              strResult += "<ul class='list-unstyled'>";
              resultPlaces.forEach(function(place) {
                var lat = place.location.coordinates[1];
                var lon = place.location.coordinates[0];
                strResult += "<li ng-mouseover='showMarker(" + lat + "," + lon + ",$event" + ")'" + "id='" + place.id + "'>" +
                  "<button type='button'>" +
                  "<span class='search-in-location-address pull-left'> <i class='fa fa-heart' aria-hidden='true'>" +
                  "</i>&nbsp" + place.rate + "</span><h3>" +
                  "<a ng-href='#!/places/" + place.id + "'>" + place.name + "</a></h3>" +
                  "" + place.address + "</button></li>";
              });
              strResult += "</ul>";
            }
            if (ctrl.resultTracks.length > 0) {
              resultTracks = _.orderBy(resultTracks, ['rate'], ['desc']);
              strResult += "<h3>Tracks</h3>";
              strResult += "<ul class='list-unstyled'>";
              resultTracks.forEach(function(track) {
                strResult += "<li>" +
                  "<button type='button'>" +
                  "<span class='search-in-location-address pull-left'> <i class='fa fa-heart' aria-hidden='true'>" +
                  "</i>&nbsp" + track.rate + "</span><h3>" +
                  "<a ng-href='#!/tracks/" + track._id + "'>" + track.name + "</a></h3></button></li>";
              });
              strResult += "</ul>";

            }
          }
          angular.element(document.querySelector('#searchPlaces')).append($compile(strResult)($scope));
        }

        function showPlaces(places) {
          places.forEach(function(place) {
            photo = place.photos[0];
            if (!place.photos[0])
              photo = noname;

            var iconmarker = "assets/img/places/marker/search.png";
            marker(place.location.coordinates[0], place.location.coordinates[1], iconmarker)
              .addTo(mapFactory.map)
              .bindPopup('<div class=\'popup  center-block\'><h3>' + place.name + '</h3><a>' +
                '<img class=\'marker-image  center-block\' src=\'' + photo + '\' /></a>' +
                '<br /><br /><button type=\'button\' class=\'btn btn-default btn-md center-block\'> ' +
                '<a href=\'#!/places/' + place._id + '\'>Details >></a> ' +
                '</button></div>', {autoPan: false});
          });
          mapFactory.map.closePopup();
          mapFactory.map.on('click move', function() {
          });

          return markers;
        }

        var marker = function(lon, lat, iconmarker) {

          var newIcon = L.icon({
            iconUrl: "assets/img/places/marker/search.png",
            shadowUrl: 'assets/img/places/marker/marker-shadow.png',
            iconSize: [30, 46],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],

          });
          markerobj = L.marker([lat, lon], newIcon, zIndexOffset = 50);
          markerobj.setIcon(newIcon);
          markerobj.setZIndexOffset(5000);
          markers.push(markerobj);
          return markerobj;

        };
        angular.element(document).ready(function() {
          angular.element(document).on('click', function() {

            $timeout(function() {
              $scope.noResults = false;
              $scope.minchars = false;
            }, 5000);
            $scope.$apply();
          });

        });
      }]
  });