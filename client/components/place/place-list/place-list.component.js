angular.module('placeList', ['filterMapType', 'popularTracks'])
  .component('placeList', {
    templateUrl: 'components/place/place-list/place-list.template.html',
    controller: ['placesOnMap', 'mapMarkingTypes', 'Place', 'Track', 'currentUser',
    function(placesOnMap, mapMarkingTypes, Place, Track, currentUser) {
      var i;
      var placesOnLoad = 'featuredPlace';
      var checkedClass = 'glyphicon glyphicon-ok';
      var places = [];
      var tracks = [];
      var counter;
      var addPlaceMenu = angular.element('#add-place');
      var addTrackMenu = angular.element('#add-track');
      var newPlaceLongitude = angular.element('#longitude');
      var newPlaceLatitude = angular.element('#latitude');
      var addPlaceForm = angular.element('form[name="placeMaker"]');
      var addTrackForm = angular.element('form[name="trackMaker"]');
      var addPlaceMenuIsOpen = false;
      var addTrackMenuIsOpen = false;

      this.user = currentUser;

      // -----START ADD Place-----
      this.newPlace = {
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
      var emptyPlaceObject = angular.copy(this.newPlace);
      this.newPlaceType = '';
      this.newPlacePhoto = '';
      this.formNewPlaceSubmitted = false;

      function openAddPlaceMenu() {
        addPlaceMenu.css({
          display: 'block'
        });
        addPlaceMenuIsOpen = true;
        placesOnMap.openAddPlaceMenu();
      }

      this.closeAddPlaceMenu = function() {
        addPlaceMenu.css({
          display: 'none'
        });
        addPlaceMenuIsOpen = false;
        placesOnMap.closeAddPlaceMenu();
        addPlaceMenuIsOpen = false;
      };

      this.addPlace = function() {
        if (addPlaceMenuIsOpen) {
          this.closeAddPlaceMenu();
        } else {
          this.closeAddTrackMenu();
          openAddPlaceMenu();
        }
      };

      this.createNewPlace = function(form) {
        var createdPlaceType;
        this.formNewPlaceSubmitted = true;
        if (addPlaceForm.hasClass('ng-valid') && placesOnMap.coords) {
          this.newPlace.type = this.newPlaceType.type;
          createdPlaceType = this.newPlaceType.type;
          this.newPlace.owner = this.user._id;
          this.newPlace.location.coordinates = placesOnMap.coords;
          var newPlaces = [];
          newPlaces.push(this.newPlace);
          //placesOnMap.showPlaces(newPlaces);
          Place.post(this.newPlace);
          this.checkType(createdPlaceType);
          this.resetAddPlaceForm(form);
          console.log(this.newPlace);
        }
      };

      this.resetAddPlaceForm = function(form) {
        if (form) {
          this.newPlace = angular.copy(emptyPlaceObject);
          this.newPlaceType = '';
          form.$setPristine();
          form.$setUntouched();
          this.formNewPlaceSubmitted = false;
          newPlaceLongitude.text('');
          newPlaceLatitude.text('');
          placesOnMap.removeNewMarker();
        }
      };
      // -----END ADD Place-----

      // -----START ADD Track-----
      this.newTrack = {
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
      this.newTrackType = '';
      this.formNewTrackSubmitted = false;

      function openAddTrackMenu() {
        addTrackMenu.css({
          display: 'block'
        });
        addTrackMenuIsOpen = true;
        placesOnMap.openAddTrackMenu();
      }

      this.closeAddTrackMenu = function() {
        addTrackMenu.css({
          display: 'none'
        });
        addTrackMenuIsOpen = false;
        placesOnMap.closeAddTrackMenu();
        addTrackMenuIsOpen = false;
      };

      this.addTrack = function() {
        if (addTrackMenuIsOpen) {
          this.closeAddTrackMenu();
        } else {
          this.closeAddPlaceMenu();
          openAddTrackMenu();
        }
      };

      this.createNewTrack = function(form) {
        this.formNewTrackSubmitted = true;
        if (addTrackForm.hasClass('ng-valid')) {
          this.newTrack.type = this.newTrackType.type;
          this.newTrack.userId = this.user._id;
          // this.newPlace.location.coordinates = placesOnMap.coords;
          console.log(this.newPlace);
          this.resetAddTrackForm(form);
        }
      };

      this.resetAddTrackForm = function(form) {
        if (form) {
          this.newTrack = angular.copy(emptyTrackObject);
          this.newTrackType = '';
          form.$setPristine();
          form.$setUntouched();
          this.formNewTrackSubmitted = false;
        }
      };
      // -----END ADD Track-----

      this.placesType = mapMarkingTypes.placesType;
      placesOnMap.removePlaces();
      placesOnMap.showMap();
      placesOnMap.initGroupsOfPlaces(this.placesType);

        // ---START---- ShowPlacesOnLoad
        // TODO: Move this inside resolve
      Place.getList({type: placesOnLoad}).then(function(result) {
        counter = 1;
        places = result.concat(places);
        placesOnMap.showPlaces(places, placesOnLoad);
        angular.element('#' + placesOnLoad + ' span').addClass(checkedClass);
        angular.element('#Streets span').addClass(checkedClass);
      });
        // ----END---- ShowPlacesOnLoad

        // ----START---- FilterByOneOfType
      this.checkType = function(input) {
        console.log(input);
        var spanCheck = angular.element('#' + input + ' span');
        if (spanCheck.hasClass(checkedClass)) {
          counter--;
          spanCheck.removeClass(checkedClass);
          angular.element('#all span').removeClass(checkedClass);
          placesOnMap.removePlaces(input);
          places = places.filter(function(place) {
            return place.type != input;
          });
        } else {
          counter++;
          spanCheck.addClass(checkedClass);

          if (counter == this.placesType.length)
            angular.element('#all span').addClass(checkedClass);

          Place.getList({type: input}).then(function(result) {
            places = result.concat(places);
            placesOnMap.showPlaces(places, input);
          });
        }
      };
        // ----END---- FilterByOneOfType

        // ----START---- FilterCheckAll
      this.checkAll = function() {
        var spanCheck = angular.element('#all span');
        if (spanCheck.hasClass(checkedClass)) {
          counter = 0;
          angular.element('.placeFilter a span').removeClass(checkedClass);
          placesOnMap.removePlaces();
          places = [];
        } else {
          counter = this.placesType.length;
          placesOnMap.removePlaces();
          places = [];
          angular.element('.placeFilter a span').addClass(checkedClass);

          Place.getList().then(function(result) {
            places = result.concat(places);
            placesOnMap.showPlaces(places);
          });
        }
      };
        // ----END---- FilterCheckAll

      this.places = places;

        // Don't hide dropdown if clicked
      angular.element('.dropdownFilter').on({
        'click': function(e) {
          e.stopPropagation();
        }
      });

        /** * START tracks controller ***/
      var activeLiCounter = 4;
      this.tracksType = mapMarkingTypes.tracks;
      Track.getList().then(function(result) {
        tracks = result;
        placesOnMap.showTracks(tracks);
      });

      this.showSpecificTracks = function(tracksType) {
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

      this.checkAllTracks = function() {
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
