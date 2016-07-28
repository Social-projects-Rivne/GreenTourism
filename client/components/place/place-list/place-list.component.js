angular.module('placeList', ['filterMapType', 'popularTracks', 'ngAnimate'])
  .component('placeList', {
    templateUrl: 'components/place/place-list/place-list.template.html',
    controller: ['placesOnMap', 'mapMarkingTypes', 'Place', 'Track',
      'currentUser', 'constants', 'Restangular',
      function(placesOnMap, mapMarkingTypes, Place, Track,
               currentUser, constants, Restangular) {
        var ctrl = this;
        var places = [];
        var tracks = [];
        var placeCounter = 1;
        var trackCounter;
        var placeTypeLength;
        var trackTypeLength;
        var key;

        ctrl.addPlaceMenuIsOpen = false;
        ctrl.coordsForNewPlace = placesOnMap.coords;

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
          angular.element('.popular-places-wrapper').css('display', 'block');
          var popularPlacesIcon = angular.element('#popularPlaces');
          if (popularPlacesIcon.hasClass(constants.checkedClass)) {
            popularPlacesIcon.toggleClass(constants.checkedClass, false);
            ctrl.hidePopularPlaces = true;
          } else {
            popularPlacesIcon.toggleClass(constants.checkedClass, true);
            angular.element('#popularTracks').toggleClass(constants.checkedClass, false);

            ctrl.hidePopularPlaces = false;
            ctrl.hidePopularTracks = true;
          }
        };

        ctrl.checkPopularTracks = function() {
          angular.element('.popular-tracks-wrapper').css('display', 'block');
          var popularTracksIcon = angular.element('#popularTracks');
          if (popularTracksIcon.hasClass(constants.checkedClass)) {
            popularTracksIcon.toggleClass(constants.checkedClass, false);
            ctrl.hidePopularTracks = true;
          } else {
            popularTracksIcon.toggleClass(constants.checkedClass, true);
            angular.element('#popularPlaces').toggleClass(constants.checkedClass, false);

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
            places = [];
            placesOnMap.removePlaces();
            places = result.concat(places);
            placesOnMap.showPlaces(result, constants.placesOnLoad);
            angular.element('.' + constants.placesOnLoad + ' span')
              .toggleClass(constants.checkedSpanClass, true);
            angular.element('.placesIcon')
              .toggleClass(constants.checkedClass, true);
            angular.element('.placesIcon')
              .toggleClass(constants.checkDisabled, false);
            angular.element('#Streets span')
              .toggleClass(constants.checkedSpanClass, true);
            angular.element('#spinner').toggleClass('spinner', false);
          });
        // ----END---- ShowPlacesOnLoad

        // ----START---- FilterByOneOfType
        ctrl.checkType = function(input) {
          var checkPlace = angular.element('.' + input + ' span');
          if (checkPlace.hasClass(constants.checkedSpanClass)) {
            placeCounter--;
            angular.element('.' + input + ' span')
              .toggleClass(constants.checkedSpanClass, false);
            angular.element('.check-all-places span')
              .toggleClass(constants.checkedSpanClass, false);
            placesOnMap.removePlaces(input);
            places = places.filter(function(place) {
              return place.type !== input;
            });
          } else {
            placeCounter++;
            angular.element('.' + input)
              .toggleClass(constants.checkDisabled, true);
            checkPlace.toggleClass(constants.spinner, true);
            angular.element('.placesIcon')
              .toggleClass(constants.checkDisabled +
                ' ' + constants.checkedClass, true);
            angular.element('#spinner').toggleClass('spinner', true);

            Place.getList({type: input}).then(function(result) {
              places = result.concat(places);
              placesOnMap.showPlaces(result, input);

              checkPlace.toggleClass(constants.spinner, false);
              checkPlace.toggleClass(constants.checkedSpanClass, true);
              angular.element('.' + input)
                .toggleClass(constants.checkDisabled, false);
              if (placeCounter === placeTypeLength) {
                angular.element('.check-all-places span')
                  .toggleClass(constants.checkedSpanClass, true);
              }
              if (!angular.element('.placeFilter a span')
                  .hasClass(constants.spinner)) {
                angular.element('#spinner').toggleClass('spinner', false);
                angular.element('.placesIcon')
                  .toggleClass(constants.checkDisabled, false);
              }
            });
          }
          if (placeCounter === 0) {
            angular.element('.placesIcon')
              .toggleClass(constants.checkedClass, false);
          }
        };
        // ----END---- FilterByOneOfType

        // ----START---- FilterCheckAll
        ctrl.checkAllPlaces = function(input) {
          var checkAllPlaces = angular.element('.check-all-places span');
          if (input) {
            checkAllPlaces.toggleClass(constants.checkedSpanClass, true);
          }
          if (checkAllPlaces.hasClass(constants.checkedSpanClass)) {
            placeCounter = 0;
            angular.element('.placeFilter span')
              .toggleClass(constants.checkedSpanClass, false);
            angular.element('.placesIcon')
              .toggleClass(constants.checkedClass, false);
            placesOnMap.removePlaces();
            places = [];
          } else {
            placeCounter = placeTypeLength;

            checkAllPlaces.toggleClass(constants.checkedSpanClass, true);

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
