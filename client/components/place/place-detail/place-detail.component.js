angular.module('placeDetail', ['comment', 'like', 'ngAnimate', 'ngMessages'])
  .component('placeDetail', {
    templateUrl: 'components/place/place-detail/place-detail.template.html',
    bindings: {
      place: '<'
    },
    controller: function placeDetailCtrl($scope, constants, mapMarkingTypes, preloadImages, $timeout, Place, currentUser) {
      angular.element(document).ready(function() {
        angular.element('.fancybox').fancybox();
      });
      var ctrl = this;
      ctrl.removePhotosArray = [];

      ctrl.placesType = mapMarkingTypes.places;
      ctrl.currentUser = currentUser;
      ctrl.hideForm = true;
      ctrl.defaultPlace = angular.copy(ctrl.place);

      ctrl.removePhoto = function(photo) {
        ctrl.removePhotosArray.push(photo);
        ctrl.place.photos = _.without(ctrl.place.photos, photo);
      };

      ctrl.addPhoto = function(photo) {
        ctrl.error = '';
        if (photo) {
          if (_.includes(ctrl.place.photos, photo)) {
            ctrl.error = 'This URL is already exist. Please, paste another URL';
          } else {
            ctrl.place.photos.push(photo);
            angular.element('#add-photo')[0].value = '';
          }
        } else {
          ctrl.error = 'You did not attach any image URL';
        }
      };

      ctrl.enableEditMode = function() {
        ctrl.showMessage = false;
        ctrl.message = '';
        angular.element('#show-message').removeClass();
        angular.element('.edit-button').toggleClass('edit-mode-active');
        angular.element('#editPlaceForm').css('display', 'block');

        if (ctrl.hideForm) ctrl.hideForm = false;
        else ctrl.hideForm = true;
      };

      ctrl.updatePlace = function(place) {
        angular.element('#show-message').removeClass('alert-info');
        ctrl.message = '';
        if (place) {
          var placeObject = {
            name: place.name,
            description: place.description,
            address: place.address,
            photos: ctrl.place.photos,
            type: (function() {
              return place.type1 || ctrl.defaultPlace.type;
            })()
          };

          for (var key in placeObject) {
            if ({}.hasOwnProperty.call(placeObject, key)) {
              if (placeObject[key] === ctrl.defaultPlace[key])
                delete placeObject[key];
            }
          }
          if (_.isEqual(placeObject.photos, ctrl.defaultPlace.photos))
            delete placeObject.photos;

          if (Object.keys(placeObject).length) {
            Place.one(ctrl.place._id).customPUT(placeObject)
              .then(function(obj) {
                ctrl.showMessage = true;
                ctrl.defaultPlace = angular.copy(obj.record);
                ctrl.place = angular.copy(ctrl.defaultPlace);
                angular.element('#show-message')
                  .addClass('alert alert-success text-center');
                ctrl.message = 'Your changes was saved successfully!';
              }, function() {
                angular.element('#show-message').removeClass();
                angular.element('#show-message')
                  .addClass('alert alert-danger text-center');
                ctrl.message = 'There is some problem. ' +
                  'Please, reload page and try again';
              });
          } else {
            ctrl.showMessage = true;
            angular.element('#show-message')
              .addClass('alert alert-info text-center');
            ctrl.message = 'Nothing to change';
          }
        } else {
          angular.element('#show-message').removeClass();
          ctrl.message = '';
          ctrl.error = '';
          ctrl.showMessage = false;
          ctrl.place = angular.copy(ctrl.defaultPlace);
        }
      };

      if(ctrl.marker){
        ctrl.marker.clearLayers();
        ctrl.map.removeLayer(layerStreet);
      }
      angular.element('#map1').attr('id', ctrl.place._id);
      ctrl.map =  L.map(ctrl.place._id, {
        center: constants.mapCenter,
        zoom: constants.defaultZoom-8
      });
      ctrl.noname = 'http://homyachok.com.ua/images/noimage.png';
      var layerStreet = L.tileLayer(mapMarkingTypes.layers.streets.link, {
        attribution: mapMarkingTypes.layers.streets.attribute
      });

      ctrl.map.addLayer(layerStreet);
      ctrl.marker = L.marker(L.latLng(ctrl.place.location.coordinates[1],
        ctrl.place.location.coordinates[0])).addTo(ctrl.map);
      ctrl.marker.bindPopup('<div class="popup"><h3>' + ctrl.place.name +
        '</h3><a><img class="marker-image center-block" ng-src="{{' + ctrl.place.photos[0] || '' +
        '}}" /></a><br />').openPopup();
      var deltaheight = 0.5;
      ctrl.map.setView([ctrl.place.location.coordinates[1] + deltaheight,
        ctrl.place.location.coordinates[0]]);

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
