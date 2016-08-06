angular.module('trackDetail', ['comment'])
  .component('trackDetail', {
    templateUrl: 'components/place/track-detail/track-detail.template.html',
    bindings: {
      track: '<'
    },
    controller: function trackDetailCtrl($scope, constants, mapMarkingTypes, $timeout, Track) {
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
      /*this.marker = L.marker(L.latLng(this.track.location.coordinates[1],
        this.track.location.coordinates[0])).addTo(this.map);
      this.marker.bindPopup('<div class="popup"><h3>' + this.track.name +
        '</h3><a><img class="marker-image center-block" ng-src="{{' + this.track.photos[0] || '' +
        '}}" /></a><br />').openPopup();*/
      var deltaheight = 0.5;
      this.map.setView([this.track.location.coordinates[1] + deltaheight,
        this.track.location.coordinates[0]]);
      this.indexBegin = 1;
      $scope.numberOfphoto = 6;
      $scope.loading = false;
      var arrForPreload = _.slice(this.track.photos, $scope.numberOfphoto - 6, $scope.numberOfphoto);
      this.morePhotos = function() {
        $scope.loading = true;
        /*preloadImages(arrForPreload).then(
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
        );*/
      };
      var ctrl = this;
      ctrl.placesInLocationArr = [];
      function getPlacesInLocation() {
        ctrl.mapBounds = ctrl.map.getBounds();
        Track.getList({
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
        return (value.type == constants.placesOnLoad || value.type == ctrl.track.type) && value.photos
          && value.id != ctrl.track.id;
      };
    }
  });