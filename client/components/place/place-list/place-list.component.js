angular.module('placeList', ['filterMapType', 'popularTracks', 'ngAnimate'])
  .component('placeList', {
    templateUrl: 'components/place/place-list/place-list.template.html',
    controller: ['placesOnMap', 'mapMarkingTypes', 'Place', 'Track',
      'currentUser', 'constants', 'Restangular', '$scope',
      function(placesOnMap, mapMarkingTypes, Place, Track,
               currentUser, constants, Restangular, $scope) {
        var ctrl = this;
        var places = [];
        var tracks = [];
        var placeCounter;
        var trackCounter;
        var placeTypeLength;
        var trackTypeLength;
        var addTrackForm = angular.element('form[name="trackMaker"]');
        ctrl.addPlaceMenuIsOpen = false;
        ctrl.addTrackMenuIsOpen = false;

        ctrl.user = currentUser;

        // -----START ADD Place-----
        ctrl.newPlace = angular.copy(constants.emptyPlaceModel);
        ctrl.newPlaceType = '';
        ctrl.newPlacePhoto = '';
        ctrl.formNewPlaceSubmitted = false;

        ctrl.toggleAddPlaceMenu = function() {
          if (ctrl.addPlaceMenuIsOpen) {
            placesOnMap.closeAddPlaceMenu();
            ctrl.addPlaceMenuIsOpen = false;
          } else {
            placesOnMap.openAddPlaceMenu();
            ctrl.addPlaceMenuIsOpen = true;
          }
        };

        ctrl.createNewPlace = function(form) {
          var addPlaceForm = angular.element('form[name="placeMaker"]');
          var checkActiveType;
          var newPlaces = [];
          ctrl.coordsIsDefined = placesOnMap.coordsIsDefined;
          ctrl.formNewPlaceSubmitted = true;
          if (addPlaceForm.hasClass('ng-valid') && placesOnMap.coords) {
            ctrl.newPlace.type = ctrl.newPlaceType;
            ctrl.newPlace.owner = ctrl.user._id; // TODO: move into server-side
            ctrl.newPlace.location.coordinates = placesOnMap.coords;
            newPlaces.push(ctrl.newPlace);
            Restangular.oneUrl('location', 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + placesOnMap.coords[1] +
              '&lon=' + placesOnMap.coords[0] + '&addressdetails=0&zoom=10').get().then(function(result) {
                ctrl.newPlace.address = result.display_name;
                Place.post(ctrl.newPlace).then(function() {
                  checkActiveType = angular.element('.' + ctrl.newPlace.type + ' span');
                  if (checkActiveType.hasClass(constants.checkedClass)) {
                    placesOnMap.showPlaces(newPlaces);
                  } else {
                    ctrl.checkType(ctrl.newPlace.type);
                  }
                  ctrl.resetAddPlaceForm(form);
                });
              });
          }
        };

        ctrl.resetAddPlaceForm = function(form) {
          var newPlaceLongitude = angular.element('#longitude');
          var newPlaceLatitude = angular.element('#latitude');
          if (form) {
            ctrl.newPlace = angular.copy(constants.emptyPlaceModel);
            ctrl.newPlaceType = '';
            form.$setPristine();
            form.$setUntouched();
            ctrl.formNewPlaceSubmitted = false;
            newPlaceLongitude.text('');
            newPlaceLatitude.text('');
            placesOnMap.coords = [];
            placesOnMap.coordsIsDefined = false;
            placesOnMap.removeNewMarker();
          }
        };
        // -----END ADD Place-----

        // -----START ADD Track-----
        ctrl.newTrack = angular.copy(constants.emptyTrackModel);
        ctrl.formNewTrackSubmitted = false;
        ctrl.addPointMenuIsOpen = false;
        ctrl.newPoint = angular.copy(constants.emptyPlaceModel);
        var newTrack;
        var newPointForTrack;
        var placesForTrack = [];
        var newPointsForTrack = [];

        ctrl.toggleAddTrackMenu = function() {
          var map = placesOnMap.map;
          if (ctrl.addTrackMenuIsOpen) {
            ctrl.addTrackMenuIsOpen = false;
            map.off('click', addNewTrackPoint);
            for (var key in placesOnMap.places) {
              placesOnMap.places[key].forEach(function(place) {
                place.off('click', addExistingPointIntoNewTrack);
              });
            }
          } else {
            ctrl.addTrackMenuIsOpen = true;
            map.on('click', addNewTrackPoint);
            for (var key2 in placesOnMap.places) {
              placesOnMap.places[key2].forEach(function(place) {
                place.on('click', addExistingPointIntoNewTrack);
              });
            }
          }
        };

        function addExistingPointIntoNewTrack() {
          var map = placesOnMap.map;
          var existingPoint = {
            name: '',
            _id: '',
            location: {
              coordinates: []
            }
          };
          placesForTrack.push([this._latlng.lat, this._latlng.lng]);
          existingPoint.name = this.name;
          existingPoint._id = this._id;
          existingPoint.location.coordinates[0] = this._latlng.lng;
          existingPoint.location.coordinates[1] = this._latlng.lat;
          placesOnMap.newTrackPoints.push([existingPoint]);
          ctrl.newTrackPoints = placesOnMap.newTrackPoints;
          addNewTrackOnMap(placesForTrack);
          if (newPointForTrack) {
            map.removeLayer(newPointForTrack);
          }
          console.log(placesOnMap.newTrackPoints);
          $scope.$digest();
        }

        function addNewTrackPoint(e) {
          var map = placesOnMap.map;
          ctrl.addPointMenuIsOpen = true;
          ctrl.newPoint.location.coordinates[0] = e.latlng.lng;
          ctrl.newPoint.location.coordinates[1] = e.latlng.lat;
          if (newPointForTrack) {
            map.removeLayer(newPointForTrack);
          }
          addNewPointOnMap(e.latlng.lat, e.latlng.lng);
          $scope.$digest();
        }

        function addNewTrackOnMap(points) {
          var map = placesOnMap.map;
          if (newTrack) {
            map.removeLayer(newTrack);
          }
          newTrack = L.polyline(points, {
            color: '#000',
            opacity: 1
          }).addTo(map);
        }

        function addNewPointOnMap(lat, lon) {
          var map = placesOnMap.map;
          newPointForTrack = L.marker([lat, lon]).addTo(map);
        }

        ctrl.createNewPointForTrack = function(form) {
          if (ctrl.newPoint.name && ctrl.newPoint.type) {
            ctrl.newPoint.owner = ctrl.user._id;
            placesOnMap.newTrackPoints.push([ctrl.newPoint]);
            placesForTrack.push([ctrl.newPoint.location.coordinates[1], ctrl.newPoint.location.coordinates[0]]);
            ctrl.newTrackPoints = placesOnMap.newTrackPoints;
            console.log(placesOnMap.newTrackPoints);
            addNewTrackOnMap(placesForTrack);
            ctrl.addPointMenuIsOpen = false;
            ctrl.newPoint = angular.copy(constants.emptyPlaceModel);
            newPointsForTrack.push(newPointForTrack);
            newPointForTrack = null;
          }
        };

        ctrl.createNewTrack = function(form) {
          var addTrackForm = angular.element('form[name="trackMaker"]');
          var checkActiveType;
          ctrl.formNewTrackSubmitted = true;
          if (addTrackForm.hasClass('ng-valid')) {
            ctrl.newTrack.owner = ctrl.user._id;
            placesOnMap.newTrackPoints.forEach(function(point, index) {
              var newPoints = [];
              if (point[0]._id) {
                ctrl.newTrack.places.push(point[0]._id);
                if (index == placesOnMap.newTrackPoints.length - 1) {
                  addNewTrackIntoDB(ctrl.newTrack);
                }
              } else {
                newPoints.push(point[0]);
                Restangular.oneUrl('location', 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + point[0].location.coordinates[1] +
                '&lon=' + point[0].location.coordinates[0] + '&addressdetails=0&zoom=10').get().then(function(result) {
                  point[0].address = result.display_name;
                  console.log(point);
                  Place.post(point[0]).then(function(response) {
                    console.log(response);
                    ctrl.newTrack.places.push(response.record._id);
                    checkActiveType = angular.element('.' + point[0].type + ' span');
                    if (checkActiveType.hasClass(constants.checkedSpanClass)) {
                      placesOnMap.showPlaces(newPoints);
                      console.log(newPoints);
                    } else {
                      ctrl.checkType(point[0].type);
                    }
                    if (index == placesOnMap.newTrackPoints.length - 1) {
                      addNewTrackIntoDB(ctrl.newTrack);
                    }
                  });
                });
              }
            });
            ctrl.resetAddTrackForm(form);
          }
        };

        function addNewTrackIntoDB(object) {
          console.log(object);
          Track.post(object).then(function(response) {
            console.log('success');
            var checkActiveType = angular.element('.' + object.type + ' span:last-child');
            if (checkActiveType.hasClass(constants.checkedSpanClass)) {
              ctrl.showSpecificTracks(object.type);
              ctrl.showSpecificTracks(object.type);
            } else {
              ctrl.showSpecificTracks(object.type);
            }
          });
        }

        ctrl.resetAddTrackForm = function(form) {
          var map = placesOnMap.map;
          newPointsForTrack.forEach(function(point) {
            map.removeLayer(point);
          });
          if (form) {
            ctrl.newTrack = angular.copy(constants.emptyTrackModel);
            form.$setPristine();
            form.$setUntouched();
            ctrl.formNewTrackSubmitted = false;
            ctrl.newTrackPoints = [];
            map.removeLayer(newTrack);
          }
        };
        // -----END ADD Track-----

        // ---START---- Icons for default settings on places and Tracks
        ctrl.defaultObject = function(objectType) {
          var objectIcon = angular.element('.' + objectType);
          if (objectIcon.hasClass(constants.checkedClass)) {
            objectIcon.removeClass(constants.checkedClass);
            if (objectType === 'placesIcon') {
              ctrl.checkAllPlaces(objectIcon);
            }
            if (objectType === 'tracksIcon') {
              ctrl.checkAllTracks(objectIcon);
            }
          } else {
            objectIcon.addClass(constants.checkedClass);
            if (objectType === 'placesIcon') {
              ctrl.checkType(constants.placesOnLoad);
            }
            if (objectType === 'tracksIcon') {
              ctrl.checkAllTracks();
            }
          }
        };
        // ---END---- Icons for default settings on places and Tracks

        // ---START---- Popular places and tracks in location
        ctrl.hidePopularPlaces = true;
        ctrl.hidePopularTracks = true;

        ctrl.checkPopularPlaces = function() {
          var popularPlacesIcon = angular.element('#popularPlaces');
          if (popularPlacesIcon.hasClass(constants.checkedClass)) {
            popularPlacesIcon.removeClass(constants.checkedClass);
            ctrl.hidePopularPlaces = true;
          } else {
            popularPlacesIcon.addClass(constants.checkedClass);
            angular.element('#popularTracks')
              .removeClass(constants.checkedClass);
            ctrl.hidePopularPlaces = false;
            ctrl.hidePopularTracks = true;
          }
        };

        ctrl.checkPopularTracks = function() {
          var popularTracksIcon = angular.element('#popularTracks');
          if (popularTracksIcon.hasClass(constants.checkedClass)) {
            popularTracksIcon.removeClass(constants.checkedClass);
            ctrl.hidePopularTracks = true;
          } else {
            popularTracksIcon.addClass(constants.checkedClass);
            angular.element('#popularPlaces')
              .removeClass(constants.checkedClass);
            ctrl.hidePopularTracks = false;
            ctrl.hidePopularPlaces = true;
          }
        };
        // ---END---- Popular places and tracks in location

        // ---START--- Places
        ctrl.placesType = mapMarkingTypes.places;
        placeTypeLength = Object.keys(ctrl.placesType).length;
        placesOnMap.removePlaces();
        placesOnMap.showMap();
        placesOnMap.initGroupsOfPlaces(ctrl.placesType);

        // ---START---- ShowPlacesOnLoad
        // TODO: Move this inside resolve
        Place.getList({type: constants.placesOnLoad})
          .then(function(result) {
            placeCounter = 1;
            places = result.concat(places);
            placesOnMap.showPlaces(result, constants.placesOnLoad);
            if (ctrl.addTrackMenuIsOpen) {
              placesOnMap.places[constants.placesOnLoad].forEach(function(place) {
                place.on('click', addExistingPointIntoNewTrack);
              });
            }
            angular.element('.' + constants.placesOnLoad + ' span')
              .addClass(constants.checkedSpanClass);
            angular.element('.placesIcon').addClass(constants.checkedClass);
            angular.element('#Streets span')
              .addClass(constants.checkedSpanClass);
          });
        // ----END---- ShowPlacesOnLoad

        // ----START---- FilterByOneOfType
        ctrl.checkType = function(input) {
          var checkPlace = angular.element('.' + input + ' span');
          if (checkPlace.hasClass(constants.checkedSpanClass)) {
            placeCounter--;
            checkPlace.removeClass(constants.checkedSpanClass);
            angular.element('.check-all-places span')
              .removeClass(constants.checkedSpanClass);

            if (ctrl.addTrackMenuIsOpen) {
              placesOnMap.places[input].forEach(function(place) {
                place.off('click', addExistingPointIntoNewTrack);
              });
            }
            placesOnMap.removePlaces(input);
            places = places.filter(function(place) {
              return place.type !== input;
            });
          } else {
            placeCounter++;
            checkPlace.addClass(constants.checkedSpanClass);

            if (placeCounter === placeTypeLength)
              angular.element('.check-all-places span')
                .addClass(constants.checkedSpanClass);

            Place.getList({type: input}).then(function(result) {
              places = result.concat(places);
              placesOnMap.showPlaces(result, input);
              if (ctrl.addTrackMenuIsOpen) {
                placesOnMap.places[input].forEach(function(place) {
                  place.on('click', addExistingPointIntoNewTrack);
                });
              }
            });
          }
          if (placeCounter > 0) {
            angular.element('.placesIcon').addClass(constants.checkedClass);
          } else {
            angular.element('.placesIcon').removeClass(constants.checkedClass);
          }
        };
        // ----END---- FilterByOneOfType

        // ----START---- FilterCheckAll
        ctrl.checkAllPlaces = function(input) {
          var checkAllPlaces = angular.element('.check-all-places span');
          if (input) checkAllPlaces.addClass(constants.checkedSpanClass);
          if (checkAllPlaces.hasClass(constants.checkedSpanClass)) {
            placeCounter = 0;
            angular.element('.placeFilter span')
              .removeClass(constants.checkedSpanClass);
            angular.element('.placesIcon').removeClass(constants.checkedClass);

            for (key in placesOnMap.places) {
              if (ctrl.addTrackMenuIsOpen) {
                placesOnMap.places[key].forEach(function(place) {
                  place.off('click', addExistingPointIntoNewTrack);
                });
              }
            }
            placesOnMap.removePlaces();
            places = [];
          } else {
            placeCounter = placeTypeLength;
            placesOnMap.removePlaces();
            places = [];
            angular.element('.placeFilter span')
              .addClass(constants.checkedSpanClass);
            angular.element('.placesIcon').addClass(constants.checkedClass);

            Place.getList({}).then(function(result) {
              places = result.concat(places);
              placesOnMap.showPlaces(places);
              for (key in placesOnMap.places) {
                if (ctrl.addTrackMenuIsOpen) {
                  placesOnMap.places[key].forEach(function(place) {
                    place.on('click', addExistingPointIntoNewTrack);
                  });
                }
              }
            });
          }
        };
        // ----END---- Places

        ctrl.places = places;

        // Don't hide dropdown if clicked
        angular.element('.dropdownStop').on({
          click: function(e) {
            e.stopPropagation();
          }
        });

        // *** START tracks controller ***
        ctrl.tracksType = mapMarkingTypes.tracks;
        trackTypeLength = Object.keys(ctrl.tracksType).length;
        Track.getList().then(function(result) {
          trackCounter = trackTypeLength;
          tracks = result;
          placesOnMap.showTracks(tracks);
        });

        ctrl.showSpecificTracks = function(tracksType) {
          var element = angular.element('.' + tracksType + ' span:last-child');

          if (element.hasClass(constants.checkedSpanClass)) {
            element.removeClass(constants.checkedSpanClass);
            angular.element('.check-all-tracks span')
              .removeClass(constants.checkedSpanClass);
            trackCounter--;
            placesOnMap.removeTracks(tracksType);
          } else {
            element.addClass(constants.checkedSpanClass);
            trackCounter++;
            if (trackCounter === trackTypeLength)
              angular.element('.check-all-tracks span')
                .addClass(constants.checkedSpanClass);

            Track.getList({type: tracksType}).then(function(result) {
              tracks = result;
              placesOnMap.showTracks(tracks);
            });
          }
          if (trackCounter > 0) {
            angular.element('.tracksIcon').addClass(constants.checkedClass);
          } else {
            angular.element('.tracksIcon').removeClass(constants.checkedClass);
          }
        };

        ctrl.checkAllTracks = function(input) {
          var checkAllTracks = angular.element('.check-all-tracks span');
          if (input) checkAllTracks.addClass(constants.checkedSpanClass);
          if (checkAllTracks.hasClass(constants.checkedSpanClass)) {
            trackCounter = 0;
            angular.element('.trackFilter span')
              .removeClass(constants.checkedSpanClass);
            angular.element('.tracksIcon').removeClass(constants.checkedClass);
            placesOnMap.removeAllTracks();
          } else {
            trackCounter = trackTypeLength;
            angular.element('.trackFilter span:last-child')
              .addClass(constants.checkedSpanClass);
            angular.element('.tracksIcon').addClass(constants.checkedClass);

            Track.getList().then(function(result) {
              tracks = result;
              placesOnMap.showTracks(tracks);
            });
          }
        };
        // *** END tracks controller ***
      }]
  });
