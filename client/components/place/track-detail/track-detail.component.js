angular.module('trackDetail', ['comment', 'like'])
  .component('trackDetail', {
    templateUrl: 'components/place/track-detail/track-detail.template.html',
    bindings: {
      track: '<'
    },
    controller: ['$scope', 'constants', 'mapMarkingTypes', '$timeout', 'Track',
                 'placesOnMap', 'preloadImages', 'currentUser',
      function trackDetailCtrl($scope, constants, mapMarkingTypes, $timeout,
                               Track, placesOnMap, preloadImages, currentUser) {
        var ctrl = this;
        ctrl.currentUser = currentUser;
        ctrl.track = this.track;
        ctrl.hideForm = true;
        ctrl.trackTypes = mapMarkingTypes.tracks;
        var placesInTrackArray = [];
        ctrl.placesInTrack = [];
        ctrl.currentTrackType = ctrl.track.type;
        ctrl.defaultTrack = angular.copy(ctrl.track);
        ctrl.newPhoto = '';
        ctrl.fotoIsNotCovered = {};

        ctrl.track.photos.forEach(function(track, index) {
          ctrl.fotoIsNotCovered[index] = true;
        });

        ctrl.enableEditMode = function() {
          ctrl.showMessage = false;
          ctrl.message = '';
          angular.element('#show-message').removeClass();
          angular.element('.edit-button').toggleClass('edit-mode-active');
          angular.element('#editPlaceForm').css('display', 'block');
          ctrl.defaultTrack = angular.copy(ctrl.track);
          ctrl.track.type = ctrl.currentTrackType;

          if (ctrl.hideForm) {
            ctrl.hideForm = false;
          } else {
            ctrl.hideForm = true;
          }
        };

        ctrl.updateTrack = function(track) {
          angular.element('#show-message').removeClass();
          ctrl.message = '';
          if (track) {
            var trackObject = {
              name: track.name,
              description: track.description,
              type: (function() {
                return track.type || ctrl.defaultTrack.type;
              })(),
              photos: track.photos
            };

            if (_.isEqual(trackObject.photos, ctrl.defaultTrack.photos)) {
              delete trackObject.photos;
            }

            for (var key in trackObject) {
              if ({}.hasOwnProperty.call(trackObject, key)) {
                if (trackObject[key] === ctrl.defaultTrack[key])
                  delete trackObject[key];
              }
            }
            if (Object.keys(trackObject).length) {
              Track.one(ctrl.track._id).customPUT(trackObject)
                .then(function(obj) {
                  ctrl.defaultTrack = angular.copy(obj.record);
                  ctrl.track = angular.copy(ctrl.defaultTrack);
                  angular.element('#show-message')
                    .addClass('alert alert-success text-center');
                  ctrl.message = 'Your changes was saved successfully!';
                  ctrl.showMessage = true;
                  ctrl.newPhoto = '';
                  redrawTrack();
                }, function() {
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
            ctrl.message = '';
            ctrl.showMessage = false;
            ctrl.track = angular.copy(ctrl.defaultTrack);
            ctrl.track.type = ctrl.currentTrackType;
            ctrl.newPhoto = '';
            ctrl.track.photos.forEach(function(track, index) {
              ctrl.fotoIsNotCovered[index] = true;
            });
          }
        };

        function redrawTrack() {
          ctrl.map.removeLayer(currenTrack);
          var newColor = mapMarkingTypes.tracks[ctrl.track.type].color;
          drawTrack(coordsArray, newColor);
        }

        function drawTrack(coords, color) {
          return L.polyline(coords, {
            color: color,
            opacity: 1
          }).addTo(ctrl.map);
        }

        ctrl.deletePhoto = function(index) {
          ctrl.track.photos.splice(index, 1);
        };

        ctrl.addPhoto = function(track) {
          if (track) {
            if (_.includes(ctrl.track.photos, track)) {
              angular.element('#show-message')
                .addClass('alert alert-danger text-center');
              ctrl.message = 'This URL is already exist. Please, paste another URL';
              ctrl.showMessage = true;
            } else {
              angular.element('#show-message')
                  .removeClass();
              ctrl.message = '';
              ctrl.showMessage = false;
              ctrl.track.photos.push(ctrl.newPhoto);
              ctrl.newPhoto = '';
            }
            ctrl.track.photos.forEach(function(track, index) {
              ctrl.fotoIsNotCovered[index] = true;
            });
          } else {
            angular.element('#show-message')
                .addClass('alert alert-danger text-center');
            ctrl.message = 'You did not attach any image URL';
            ctrl.showMessage = true;
          }
        };

        ctrl.mouseOverPhoto = function(index) {
          ctrl.track.photos.forEach(function(track, index) {
            ctrl.fotoIsNotCovered[index] = true;
          });
          ctrl.fotoIsNotCovered[index] = false;
        };

        ctrl.mouseOutPhoto = function(index) {
          ctrl.fotoIsNotCovered[index] = true;
        };

        angular.element(document).ready(function() {
          angular.element('.fancybox').fancybox();
        });
        angular.element('#map1').attr('id', ctrl.track._id);
        ctrl.map = L.map(ctrl.track._id, {
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
        var currenTrack = drawTrack(coordsArray, color);

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
