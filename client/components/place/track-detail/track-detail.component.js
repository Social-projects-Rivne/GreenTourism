angular.module('trackDetail', ['comment', 'like'])
  .component('trackDetail', {
    templateUrl: 'components/place/track-detail/track-detail.template.html',
    bindings: {
      track: '<'
    },
    controller: ['$scope', 'constants', 'mapMarkingTypes', '$timeout', 'Track', 'placesOnMap', 'preloadImages',
      function trackDetailCtrl($scope, constants, mapMarkingTypes, $timeout, Track, placesOnMap, preloadImages) {
        var ctrl = this;
        var placesInTrackArray = [];
        ctrl.placesInTrack = [];
        angular.element(document).ready(function() {
          angular.element('.fancybox').fancybox();
        });
        ctrl.map = L.map('map1', {
          center: constants.mapCenter,
          zoom: constants.defaultZoom,
          touchZoom: false,
          dragging: false,
          scrollWheelZoom: false
        });
        ctrl.noname = 'http://homyachok.com.ua/images/noimage.png';
        var layerStreet = L.tileLayer(mapMarkingTypes.layers.streets.link, {
          attribution: mapMarkingTypes.layers.streets.attribute
        });
        ctrl.map.addLayer(layerStreet);

        var color = mapMarkingTypes.tracks[ctrl.track.type].color;
        var coordsArray = [];
        ctrl.track.location.coordinates.forEach(function(coord, index) {
          var coords = [];
          coords[0] = coord[1];
          coords[1] = coord[0];
          coordsArray[index] = coords;
        });
        L.polyline(coordsArray, {
          color: color,
          opacity: 1
        }).addTo(ctrl.map);

        ctrl.map.fitBounds(coordsArray);

        ctrl.track.places.forEach(function(place, index) {
          ctrl.placesInTrack.push(place);
          var icon = mapMarkingTypes.places[place.type].icon;
          var marker = L.marker([place.location.coordinates[1], place.location.coordinates[0]], {
            icon: L.icon({
              iconUrl: icon,
              shadowUrl: 'assets/img/places/marker/marker-shadow.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41]
            })
          }).bindPopup('<h4>' + place.name + '</h4>').addTo(ctrl.map);
          placesInTrackArray.push(marker);
        });

        ctrl.mouseOverPlace = function(place, arrayIndex) {
          ctrl.map.setView([place.location.coordinates[1], place.location.coordinates[0]]);
          placesInTrackArray[arrayIndex].openPopup();
        };

        ctrl.mouseLeavePlace = function(place) {
          ctrl.map.closePopup();
          ctrl.map.fitBounds(coordsArray);
        };
        
        ctrl.indexBegin = 1;
        $scope.numberOfphoto = 6;
        $scope.loading = false;
        var arrForPreload = _.slice(ctrl.track.photos, $scope.numberOfphoto - 6, $scope.numberOfphoto);
        ctrl.morePhotos = function() {
          $scope.loading = true;
          preloadImages(arrForPreload).then(
            $timeout(function() {
              $scope.numberOfphoto += 6;
              $scope.loading = false;
              $scope.$apply();
              var gallery = angular.element('.gallery');
              var heightScroll = $scope.numberOfphoto / 3 * 150;
              gallery.animate({
                scrollTop: heightScroll
              }, 1000);
            })
          );
        };
      }]
  });