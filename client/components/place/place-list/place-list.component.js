angular.module('placeList', ['filterMapType', 'popularTracks'])
  .component('placeList', {
    templateUrl: 'components/place/place-list/place-list.template.html',
    controller: ['placesOnMap', 'mapMarkingTypes', 'Place', 'Track', 'currentUser', 'constants',
    function(placesOnMap, mapMarkingTypes, Place, Track, currentUser, constants) {
      var i;
      var placesOnLoad = 'featuredPlace';
      var checkedClass = 'glyphicon glyphicon-ok';
      var places = [];
      var tracks = [];
      var counter;
      var typesLength;
      var addPlaceMenu = angular.element('#add-place');
      var addTrackMenu = angular.element('#add-track');
      var newPlaceLongitude = angular.element('#longitude');
      var newPlaceLatitude = angular.element('#latitude');
      var addPlaceForm = angular.element('form[name="placeMaker"]');
      var addTrackForm = angular.element('form[name="trackMaker"]');
      var addPlaceMenuIsOpen = false;
      var addTrackMenuIsOpen = false;
      var self = this;

      self.user = currentUser;

      // -----START ADD Place-----
      self.newPlace = {
        name: '',
        type: '',
        description: '',
        location: {
          type: 'Point',
          coordinates: []
        },
        photos: [],
        owner: '',
        rate: 0,
        address: ''
      };
      var emptyPlaceObject = angular.copy(self.newPlace);
      self.newPlaceType = '';
      self.newPlacePhoto = '';
      self.formNewPlaceSubmitted = false;

      function openAddPlaceMenu() {
        addPlaceMenu.css({
          display: 'block'
        });
        addPlaceMenuIsOpen = true;
        placesOnMap.openAddPlaceMenu();
      }

      self.closeAddPlaceMenu = function() {
        addPlaceMenu.css({
          display: 'none'
        });
        addPlaceMenuIsOpen = false;
        placesOnMap.closeAddPlaceMenu();
        addPlaceMenuIsOpen = false;
      };

      self.addPlace = function() {
        if (addPlaceMenuIsOpen) {
          self.closeAddPlaceMenu();
        } else {
          self.closeAddTrackMenu();
          openAddPlaceMenu();
        }
      };

      self.createNewPlace = function(form) {
        var checkActiveType;
        var newPlaces = [];
        self.formNewPlaceSubmitted = true;
        if (addPlaceForm.hasClass('ng-valid') && placesOnMap.coords) {
          self.newPlace.type = self.newPlaceType.type;
          self.newPlace.owner = self.user._id;
          self.newPlace.location.coordinates = placesOnMap.coords;
          newPlaces.push(self.newPlace);
          Place.post(self.newPlace).then(function() {
            checkActiveType = angular.element('#' + self.newPlace.type + ' span');
            if (checkActiveType.hasClass(checkedClass)) {
              placesOnMap.showPlaces(newPlaces);
            } else {
              self.checkType(self.newPlace.type);
            }
            self.resetAddPlaceForm(form);
          });
        }
      };

      self.resetAddPlaceForm = function(form) {
        if (form) {
          self.newPlace = angular.copy(emptyPlaceObject);
          self.newPlaceType = '';
          form.$setPristine();
          form.$setUntouched();
          self.formNewPlaceSubmitted = false;
          newPlaceLongitude.text('');
          newPlaceLatitude.text('');
          placesOnMap.removeNewMarker();
        }
      };
      // -----END ADD Place-----

      // -----START ADD Track-----
      self.newTrack = {
        name: '',
        type: '',
        description: '',
        location: {
          type: 'LineString',
          coordinates: []
        },
        photos: [],
        userId: ''
      };
      var emptyTrackObject = {
        name: '',
        type: '',
        description: '',
        location: {
          type: 'LineString',
          coordinates: []
        },
        photos: [],
        userId: ''
      };
      self.newTrackType = '';
      self.formNewTrackSubmitted = false;

      function openAddTrackMenu() {
        addTrackMenu.css({
          display: 'block'
        });
        addTrackMenuIsOpen = true;
        placesOnMap.openAddTrackMenu();
      }

      self.closeAddTrackMenu = function() {
        addTrackMenu.css({
          display: 'none'
        });
        addTrackMenuIsOpen = false;
        placesOnMap.closeAddTrackMenu();
        addTrackMenuIsOpen = false;
      };

      self.addTrack = function() {
        if (addTrackMenuIsOpen) {
          self.closeAddTrackMenu();
        } else {
          self.closeAddPlaceMenu();
          openAddTrackMenu();
        }
      };

      self.createNewTrack = function(form) {
        self.formNewTrackSubmitted = true;
        if (addTrackForm.hasClass('ng-valid')) {
          self.newTrack.type = self.newTrackType.type;
          self.newTrack.userId = self.user._id;
          // self.newPlace.location.coordinates = placesOnMap.coords;
          console.log(self.newPlace);
          self.resetAddTrackForm(form);
        }
      };

      self.resetAddTrackForm = function(form) {
        if (form) {
          self.newTrack = angular.copy(emptyTrackObject);
          self.newTrackType = '';
          form.$setPristine();
          form.$setUntouched();
          self.formNewTrackSubmitted = false;
        }
      };
      // -----END ADD Track-----

      self.placesType = mapMarkingTypes.places;
      typesLength = Object.keys(this.placesType).length;
      placesOnMap.removePlaces();
      placesOnMap.showMap();
      placesOnMap.initGroupsOfPlaces(self.placesType);

        // ---START---- ShowPlacesOnLoad
        // TODO: Move this inside resolve
      Place.getList({type: constants.placesOnLoad}).then(function(result) {
        counter = 1;
        places = result.concat(places);
        placesOnMap.showPlaces(result, constants.placesOnLoad);
        angular.element('#' + constants.placesOnLoad + ' span').addClass(constants.checkedClass);
        angular.element('#Streets span').addClass(constants.checkedClass);
      });
        // ----END---- ShowPlacesOnLoad

        // ----START---- FilterByOneOfType
      self.checkType = function(input) {
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
            placesOnMap.showPlaces(places, input);
          });
        }
      };
        // ----END---- FilterByOneOfType

        // ----START---- FilterCheckAll
      self.checkAll = function() {
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
        // ----END---- FilterCheckAll

      self.places = places;

        // Don't hide dropdown if clicked
      angular.element('.dropdownFilter').on({
        'click': function(e) {
          e.stopPropagation();
        }
      });

        /** * START tracks controller ***/
      var activeLiCounter = 4;
      self.tracksType = mapMarkingTypes.tracks;
      Track.getList().then(function(result) {
        tracks = result;
        placesOnMap.showTracks(tracks);
      });

      self.showSpecificTracks = function(tracksType) {
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

      self.checkAllTracks = function() {
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
    }]
  });
