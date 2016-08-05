angular.module('placeDetail', ['comment'])
  .component('placeDetail', {
    templateUrl: 'components/place/place-detail/place-detail.template.html',
    bindings: {
      place: '<'
    },
    controller: function placeDetailCtrl($scope, constants, mapMarkingTypes, preloadImages, $timeout) {
      angular.element(document).ready(function() {
        angular.element('.fancybox').fancybox();
      });
      this.map = L.map('map1', {
        center: constants.mapCenter,
        zoom: constants.defaultZoom - 6,
        touchZoom: false,
        dragging: false,
        scrollWheelZoom: false
      });
      var layerStreet = L.tileLayer(mapMarkingTypes.layers.streets.link, {
        attribution: mapMarkingTypes.layers.streets.attribute
      });
      this.map.addLayer(layerStreet);
      this.marker = L.marker(L.latLng(this.place.location.coordinates[1],
        this.place.location.coordinates[0])).addTo(this.map);
      this.marker.bindPopup('<div class="popup"><h3>' + this.place.name +
        '</h3><a><img class="marker-image center-block" src="' +
        this.place.photos[0] +
        '" /></a><br />').openPopup();
      var deltaheight = 0.1;
      this.map.setView([this.place.location.coordinates[1] + deltaheight,
        this.place.location.coordinates[0]]);
      this.indexBegin = 1;
      $scope.numberOfphoto = 9;
      $scope.loading = false;
      var arrForPreload = _.slice(this.place.photos, $scope.numberOfphoto - 9, $scope.numberOfphoto);
      this.morePhotos = function() {
        $scope.loading = true;
        preloadImages(arrForPreload).then(
          $timeout(function() {
            $scope.numberOfphoto = $scope.numberOfphoto + 9;
            $scope.loading = false;
            $scope.$apply();
            var page = angular.element('.container_page');
            var heightScroll = $scope.numberOfphoto / 3 * 150;
            page.animate({
              scrollTop: heightScroll
            }, 1000);
          })
        );
      }
    }
  });
