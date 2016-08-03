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
        var placeCounter = 1;
        var trackCounter;
        var placeTypeLength;
        var trackTypeLength;
        var map = placesOnMap.showMap();
        var activePlacesTypes = [];
        var key;

        ctrl.user = currentUser;

        // -----START ADD Place-----
        ctrl.newPlace = angular.copy(constants.emptyPlaceModel);
        ctrl.newPlaceType = '';
        ctrl.newPlacePhoto = '';
        ctrl.formNewPlaceSubmitted = false;
        ctrl.addPlaceMenuIsOpen = false;

        ctrl.toggleAddPlaceMenu = function(form) {
          if (ctrl.addPlaceMenuIsOpen) {
            placesOnMap.closeAddPlaceMenu();
            ctrl.addPlaceMenuIsOpen = false;
            ctrl.resetAddPlaceForm(form);
          } else {
            placesOnMap.openAddPlaceMenu();
            ctrl.addPlaceMenuIsOpen = true;
            ctrl.addTrackMenuIsOpen = false;
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
        ctrl.newTrackObject = angular.copy(constants.emptyTrackModel);
        ctrl.addPointMenuIsOpen = false;
        ctrl.addTrackMenuIsOpen = false;
        ctrl.newPoint = angular.copy(constants.emptyPlaceModel);
        var newTrack;
        var newPointForTrack;
        var placesForTrack = [];
        var newPointsForTrack = [];
        ctrl.newTrackPoints = [];

        ctrl.toggleAddTrackMenu = function(form) {
          if (ctrl.addTrackMenuIsOpen) {
            ctrl.addTrackMenuIsOpen = false;
            ctrl.resetAddTrackForm(form);
            map.off('click', addNewTrackPointOnMap);
            for (key in placesOnMap.places) {
              placesOnMap.places[key].forEach(function(place) {
                place.off('click', addExistingPointIntoNewTrack);
              });
            }
          } else {
            ctrl.addTrackMenuIsOpen = true;
            ctrl.addPlaceMenuIsOpen = false;
            map.on('click', addNewTrackPointOnMap);
            for (key in placesOnMap.places) {
              placesOnMap.places[key].forEach(function(place) {
                place.on('click', addExistingPointIntoNewTrack);
              });
            }
          }
        };

        function addExistingPointIntoNewTrack() {
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
          ctrl.newTrackPoints.push([existingPoint]);
          addNewTrackOnMap(placesForTrack);
          if (newPointForTrack) {
            map.removeLayer(newPointForTrack);
          }
          ctrl.cancelNewPointForTrackMenu();
          newPointsForTrack.push(null);
          $scope.$digest();
        }

        function addNewTrackPointOnMap(e) {
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
          if (newTrack) {
            map.removeLayer(newTrack);
          }
          newTrack = L.polyline(points, {
            color: '#000',
            opacity: 1
          }).addTo(map);
        }

        function addNewPointOnMap(lat, lon) {
          newPointForTrack = L.marker([lat, lon], {
            icon: L.icon({
              iconUrl: 'assets/img/places/marker/grey.png',
              shadowUrl: 'assets/img/places/marker/marker-shadow.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41]
            })
          }).addTo(map);
        };

        ctrl.createNewPointForTrack = function(form) {
          if (form.$valid) {
            ctrl.newPoint.owner = ctrl.user._id; // TODO: move into server side
            ctrl.newTrackPoints.push([ctrl.newPoint]);
            placesForTrack.push([ctrl.newPoint.location.coordinates[1], ctrl.newPoint.location.coordinates[0]]);
            addNewTrackOnMap(placesForTrack);
            newPointsForTrack.push(newPointForTrack);
            ctrl.cancelNewPointForTrackMenu(form);
          }
        };

        ctrl.cancelNewPointForTrackMenu = function(form, deleteMarker) {
          if (form) {
            ctrl.addPointMenuIsOpen = false;
            ctrl.newPoint = angular.copy(constants.emptyPlaceModel);
            form.$setPristine();
            form.$setUntouched();
            if (deleteMarker) {
              map.removeLayer(newPointForTrack);
            }
            newPointForTrack = null;
          } else {
            ctrl.addPointMenuIsOpen = false;
            ctrl.newPoint = angular.copy(constants.emptyPlaceModel);
            if (newPointForTrack) {
              map.removeLayer(newPointForTrack);
            }
            newPointForTrack = null;
          }
        };

        ctrl.removePointFromNewPointsArray = function(pointIndexInArray) {
          var removedPoints = newPointsForTrack.slice(pointIndexInArray, newPointsForTrack.length);
          newPointsForTrack.splice(pointIndexInArray, ctrl.newTrackPoints.length - pointIndexInArray);
          placesForTrack.splice(pointIndexInArray, ctrl.newTrackPoints.length - pointIndexInArray);
          ctrl.newTrackPoints.splice(pointIndexInArray, ctrl.newTrackPoints.length - pointIndexInArray);
          removedPoints.forEach(function(point) {
            if (point) {
              map.removeLayer(point);
            }
          });
          if (newPointForTrack) {
            map.removeLayer(newPointForTrack);
          }
          map.removeLayer(newTrack);
          addNewTrackOnMap(placesForTrack);
        };

        ctrl.createNewTrack = function(form) {
          var checkActiveType;
          var newPointsCounter = 0;
          var counterByNewPoints = 0;
          if (form.$valid) {
            ctrl.newTrackObject.owner = ctrl.user._id;
            ctrl.newTrackPoints.forEach(function(point) {
              if (!point[0]._id) {
                newPointsCounter++;
              }
            });
            if (newPointsCounter === 0) {
              addNewTrackIntoDB(ctrl.newTrackPoints, form);
            } else {
              ctrl.newTrackPoints.forEach(function(point, index) {
                var newPoints = [];
                if (!point[0]._id)  {
                  newPoints.push(point[0]);
                  Restangular.oneUrl('location', 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + point[0].location.coordinates[1] +
                  '&lon=' + point[0].location.coordinates[0] + '&addressdetails=0&zoom=10').get().then(function(result) {
                    point[0].address = result.display_name;
                    Place.post(point[0]).then(function(response) {
                      counterByNewPoints++;
                      point[0]._id = response.record._id;
                      checkActiveType = angular.element('.' + point[0].type + ' span');
                      if (checkActiveType.hasClass(constants.checkedSpanClass)) {
                        placesOnMap.showPlaces(newPoints);
                      } else {
                        ctrl.checkType(point[0].type);
                      }
                      if (counterByNewPoints == newPointsCounter) {
                        addNewTrackIntoDB(ctrl.newTrackPoints, form);
                      }
                    });
                  });
                }
              });
            }
          }
        };

        function addNewTrackIntoDB(array, form) {
          array.forEach(function(item) {
            ctrl.newTrackObject.places.push(item[0]._id);
          });
          Track.post(ctrl.newTrackObject).then(function(response) {
            var checkActiveType = angular.element('.' + ctrl.newTrackObject.type + ' span:last-child');
            if (checkActiveType.hasClass(constants.checkedSpanClass)) {
              ctrl.showSpecificTracks(ctrl.newTrackObject.type); //TODO: Change to placesOnMap.showTracks after refactoring server track model
              ctrl.showSpecificTracks(ctrl.newTrackObject.type);
            } else {
              ctrl.showSpecificTracks(ctrl.newTrackObject.type);
            }
            ctrl.resetAddTrackForm(form);
          });
        }

        ctrl.resetAddTrackForm = function(form) {
          if (form) {
            newPointsForTrack.forEach(function(point) {
              if (point) {
                map.removeLayer(point);
              }
            });
            if (newTrack) {
              map.removeLayer(newTrack);
            }
            if (newPointForTrack) {
              map.removeLayer(newPointForTrack);
            }
            ctrl.newTrackObject = angular.copy(constants.emptyTrackModel);
            ctrl.newPoint = angular.copy(constants.emptyPlaceModel);
            form.$setPristine();
            form.$setUntouched();
            ctrl.addPointMenuIsOpen = false;
            ctrl.newTrackPoints = [];
            placesForTrack = [];
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
        placesOnMap.initGroupsOfPlaces(ctrl.placesType);

        // ---START---- ShowPlacesOnLoad
        // TODO: Move this inside resolve
        ctrl.mapBounds = map.getBounds();
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
          activePlacesTypes.push(constants.placesOnLoad);
          places = [];
          for (key in placesOnMap.places) {
            if (ctrl.addTrackMenuIsOpen) {
              placesOnMap.places[key].forEach(function(place) {
                place.off('click', addExistingPointIntoNewTrack);
              });
            }
          }
          placesOnMap.removePlaces();
          places = result;
          placesOnMap.showPlaces(places);
          for (key in placesOnMap.places) {
            if (ctrl.addTrackMenuIsOpen) {
              placesOnMap.places[key].forEach(function(place) {
                place.on('click', addExistingPointIntoNewTrack);
              });
            }
          }
          angular.element('.' + constants.placesOnLoad + ' span')
            .addClass(constants.checkedSpanClass);
          angular.element('.placesIcon').addClass(constants.checkedClass);
          angular.element('.placesIcon').removeClass(constants.checkDisabled);
          angular.element('#streets span')
            .addClass(constants.checkedSpanClass);
          angular.element('#spinner').removeClass('spinner');
        });
        // ----END---- ShowPlacesOnLoad

        // ---START--- Function which get data from DB only on special area
        function onMove() {
          ctrl.mapBounds = map.getBounds();
          if (activePlacesTypes.length) {
            angular.element('#spinner').addClass('spinner');
            Place.getList({
              type: activePlacesTypes,
              locationNE: [
                ctrl.mapBounds._northEast.lng,
                ctrl.mapBounds._northEast.lat
              ],
              locationSW: [
                ctrl.mapBounds._southWest.lng,
                ctrl.mapBounds._southWest.lat
              ]
            }).then(function(result) {
              places = [];
              for (key in placesOnMap.places) {
                if (ctrl.addTrackMenuIsOpen) {
                  placesOnMap.places[key].forEach(function(place) {
                    place.off('click', addExistingPointIntoNewTrack);
                  });
                }
              }
              placesOnMap.removePlaces();
              places = result;
              placesOnMap.showPlaces(places);
              for (key in placesOnMap.places) {
                if (ctrl.addTrackMenuIsOpen) {
                  placesOnMap.places[key].forEach(function(place) {
                    place.on('click', addExistingPointIntoNewTrack);
                  });
                }
              }
              angular.element('#spinner').removeClass('spinner');
            });
          } else {
            angular.element('#spinner').removeClass('spinner');
          }
        }
        // ---END--- Function which get data from DB only on special area

        map.on('moveend', onMove);

        // ----START---- FilterByOneOfType
        ctrl.checkType = function(input) {
          var checkPlace = angular.element('.' + input + ' span');
          if (checkPlace.hasClass(constants.checkedSpanClass)) {
            placeCounter--;
            angular.element('.' + input + ' span')
              .removeClass(constants.checkedSpanClass);
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
            activePlacesTypes = activePlacesTypes.filter(function(type) {
              return type !== input;
            });
          } else {
            activePlacesTypes.push(input);
            placeCounter++;
            angular.element('.' + input).addClass(constants.checkDisabled);
            checkPlace.addClass(constants.spinner);
            angular.element('.placesIcon')
              .addClass(constants.checkDisabled +
                ' ' + constants.checkedClass);
            angular.element('#spinner').addClass('spinner');

            Place.getList({
              type: input,
              locationNE: [
                ctrl.mapBounds._northEast.lng,
                ctrl.mapBounds._northEast.lat
              ],
              locationSW: [
                ctrl.mapBounds._southWest.lng,
                ctrl.mapBounds._southWest.lat
              ]
            }).then(function(result) {
              places = result.concat(places);
              placesOnMap.showPlaces(result, input);

              if (ctrl.addTrackMenuIsOpen) {
                placesOnMap.places[input].forEach(function(place) {
                  place.on('click', addExistingPointIntoNewTrack);
                });
              }

              checkPlace.removeClass(constants.spinner);
              checkPlace.addClass(constants.checkedSpanClass);
              angular.element('.' + input)
                .removeClass(constants.checkDisabled);
              if (placeCounter === placeTypeLength)
                angular.element('.check-all-places span')
                  .addClass(constants.checkedSpanClass);

              if (!angular.element('.placeFilter a span')
                  .hasClass(constants.spinner)) {
                angular.element('#spinner').removeClass('spinner');
                angular.element('.placesIcon')
                  .removeClass(constants.checkDisabled);
              }
            });
          }
          if (placeCounter === 0)
            angular.element('.placesIcon').removeClass(constants.checkedClass);
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
            angular.element('.placesIcon')
              .removeClass(constants.checkedClass);

            for (key in placesOnMap.places) {
              if (ctrl.addTrackMenuIsOpen) {
                placesOnMap.places[key].forEach(function(place) {
                  place.off('click', addExistingPointIntoNewTrack);
                });
              }
            }
            placesOnMap.removePlaces();
            places = [];
            activePlacesTypes = [];
          } else {
            placeCounter = placeTypeLength;
            checkAllPlaces.addClass(constants.checkedSpanClass);
            for (key in ctrl.placesType) {
              if ({}.hasOwnProperty.call(ctrl.placesType, key)) {
                if (!angular.element('.' + key + ' a span')
                    .hasClass(constants.checkedSpanClass) &&
                    !angular.element('.' + key + ' a span')
                    .hasClass(constants.spinner)) {
                  ctrl.checkType(key);
                }
              }
            }
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
            placesOnMap.removeTracks();
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
