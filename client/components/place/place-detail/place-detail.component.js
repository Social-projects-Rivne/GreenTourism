angular.module('placeDetail', ['comment'])
  .component('placeDetail', {
    templateUrl: 'components/place/place-detail/place-detail.template.html',
    bindings: {
      place: '<'
    },
    controller: function placeDetailCtrl($scope, constants, mapMarkingTypes, preloadImages, $timeout, Place) {
      angular.element(document).ready(function() {
        angular.element('.fancybox').fancybox();
      });
      this.map = L.map('map1', {
        center: constants.mapCenter,
        zoom: constants.defaultZoom - 8,
        touchZoom: false,
        dragging: false,
        scrollWheelZoom: false
      });
      this.noname = 'http://homyachok.com.ua/images/noimage.png';
      var layerStreet = L.tileLayer(mapMarkingTypes.layers.streets.link, {
        attribution: mapMarkingTypes.layers.streets.attribute
      });
      this.map.addLayer(layerStreet);
      this.marker = L.marker(L.latLng(this.place.location.coordinates[1],
        this.place.location.coordinates[0])).addTo(this.map);
      this.marker.bindPopup('<div class="popup"><h3>' + this.place.name +
        '</h3><a><img class="marker-image center-block" ng-src="{{' + this.place.photos[0] || '' +
        '}}" /></a><br />').openPopup();
      var deltaheight = 0.5;
      this.map.setView([this.place.location.coordinates[1] + deltaheight,
        this.place.location.coordinates[0]]);
      this.indexBegin = 1;
      $scope.numberOfphoto = 6;
      $scope.loading = false;
      var arrForPreload = _.slice(this.place.photos, $scope.numberOfphoto - 6, $scope.numberOfphoto);
      this.morePhotos = function() {
        $scope.loading = true;
        preloadImages(arrForPreload).then(
          $timeout(function() {
            $scope.numberOfphoto = $scope.numberOfphoto + 6;
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
      var ctrl = this;
      ctrl.placesInLocationArr = [];
      function getPlacesInLocation() {
        ctrl.mapBounds = ctrl.map.getBounds();
        Place.getList({
          type: [constants.placesOnLoad],
          locationNE: [
            ctrl.mapBounds._northEast.lng,
            ctrl.mapBounds._northEast.lat
          ],
          locationSW: [
            ctrl.mapBounds._southWest.lng,
            ctrl.mapBounds._southWest.lat
          ]
        }).then(function(result) {
          ctrl.placesInLocationArr = result;
        });
      }
      getPlacesInLocation();
      ctrl.placesFilter = function(value) {
        return (value.type == constants.placesOnLoad || value.type == ctrl.place.type) && value.photos
          && value.id != ctrl.place.id;
      };
    }
  });
