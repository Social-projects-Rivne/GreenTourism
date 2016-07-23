angular.module('placeList', ['filterMapType', 'popularTracks'])
  .component('placeList', {
    templateUrl: 'components/place/place-list/place-list.template.html',
    controller: ['placesOnMap', 'mapMarkingTypes', 'Place', 'Track', 'currentUser', 'constants', 'Restangular',
      function(placesOnMap, mapMarkingTypes, Place, Track, currentUser, constants, Restangular) {
        var places = [];
        var tracks = [];
        var counter;
        var typesLength;
        var ctrl = this;
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
                checkActiveType = angular.element('#' + ctrl.newPlace.type + ' span');
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

        ctrl.placesType = mapMarkingTypes.places;
        typesLength = Object.keys(ctrl.placesType).length;
        placesOnMap.removePlaces();
        placesOnMap.showMap();
        placesOnMap.initGroupsOfPlaces(ctrl.placesType);

        //---START---- ShowPlacesOnLoad
        // TODO: Move this inside resolve
        Place.getList({type: constants.placesOnLoad}).then(function(result) {
          counter = 1;
          places = result.concat(places);
          placesOnMap.showPlaces(result, constants.placesOnLoad);
          angular.element('#' + constants.placesOnLoad + ' span').addClass(constants.checkedClass);
          angular.element('#Streets span').addClass(constants.checkedClass);
        });
        //----END---- ShowPlacesOnLoad

        //----START---- FilterByOneOfType
        ctrl.checkType = function(input) {
          var spanCheck = angular.element('#' + input + ' span');
          if (spanCheck.hasClass(constants.checkedClass)) {
            counter--;
            spanCheck.removeClass(constants.checkedClass);
            angular.element('#all span').removeClass(constants.checkedClass);
            placesOnMap.removePlaces(input);
            places = places.filter(function(place) {
              return place.type != input;
            });
          } else {
            counter++;
            spanCheck.addClass(constants.checkedClass);

            if (counter == typesLength)
              angular.element('#all span').addClass(constants.checkedClass);

            Place.getList({type: input}).then(function(result) {
              places = result.concat(places);
              placesOnMap.showPlaces(result, input);
            });
          }
        };
        //----END---- FilterByOneOfType

        //----START---- FilterCheckAll
        ctrl.checkAll = function() {
          var spanCheck = angular.element('#all span');
          if (spanCheck.hasClass(constants.checkedClass)) {
            counter = 0;
            angular.element('.placeFilter a span').removeClass(constants.checkedClass);
            placesOnMap.removePlaces();
            places = [];
          } else {
            counter = typesLength;
            placesOnMap.removePlaces();
            places = [];
            angular.element('.placeFilter a span').addClass(constants.checkedClass);

            Place.getList().then(function(result) {
              places = result.concat(places);
              placesOnMap.showPlaces(places);
            });
          }
        };
        //----END---- FilterCheckAll

        ctrl.places = places;

        //Don't hide dropdown if clicked
        angular.element('.dropdownFilter').on({
          'click': function(e) {
            e.stopPropagation();
          }
        });


        // *** START tracks controller ***
        var activeLiCounter = Object.keys(mapMarkingTypes.tracks).length;
        
        ctrl.tracksType = mapMarkingTypes.tracks;
        Track.getList().then(function(result) {
          tracks = result;
          placesOnMap.showTracks(tracks);
        });

        ctrl.showSpecificTracks = function(tracksType) {
          var element = angular.element('#' + tracksType);
          var checkedIcon = angular.element('#gi' + tracksType);
          var allGI = angular.element('#tracks-filter li span.glyphicon');
          var checkAllElement = angular.element('#all-tracks');

          if (element.hasClass('active')) {
            element.removeClass('active');
            checkedIcon.removeClass('glyphicon-ok');
            activeLiCounter -= 1;
            if (activeLiCounter === 0) {
              allGI.removeClass('glyphicon-ok');
              checkAllElement.removeClass('active');
            }
            placesOnMap.removeTracks(tracksType);
          } else {
            element.addClass('active');
            checkedIcon.addClass('glyphicon-ok');
            activeLiCounter++;
            if (activeLiCounter === 4) {
              allGI.addClass('glyphicon-ok');
              checkAllElement.addClass('active');
            }
            Track.getList({type: tracksType}).then(function(result) {
              tracks = result;
              placesOnMap.showTracks(tracks);
            });
          }
        };

        ctrl.checkAllTracks = function() {
          var checkAllElement = angular.element('#all-tracks');
          var allLiElements = angular.element(document).find('#tracks-filter li > a');
          var allGI = angular.element('#tracks-filter li span.glyphicon');
          if (checkAllElement.hasClass('active')) {
            allLiElements.removeClass('active');
            allGI.removeClass('glyphicon-ok');
            activeLiCounter = 0;
            placesOnMap.removeAllTracks();
          } else {
            allLiElements.addClass('active');
            allGI.addClass('glyphicon-ok');
            activeLiCounter = 4;
            Track.getList().then(function(result) {
              tracks = result;
              placesOnMap.showTracks(tracks);
            });
          }
        };
        // *** END tracks controller ***
      }]
  });
