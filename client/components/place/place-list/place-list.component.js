angular.module('placeList', ['filterMapType'])
  .component('placeList', {
    templateUrl: 'components/place/place-list/place-list.template.html',
    controller: ['placesOnMap', 'mapMarkingTypes', 'Place', 'Track', 'currentUser',
    function(placesOnMap, mapMarkingTypes, Place, Track, currentUser) {
      var i;
      var placesOnLoad = 'featuredPlace';
      var arrPlaces = [];
      var places = [];
      var tracks = [];
      var placeObject = {};
      var counter;
      var addPlaceMenu = angular.element('#add-place');
      var addTrackMenu = angular.element('#add-track');
      var newPlaceLongitude = angular.element('#longitude');
      var newPlaceLatitude = angular.element('#latitude');
      var addPlaceForm = angular.element('form[name="placeMaker"]');
      var addTrackForm = angular.element('form[name="trackMaker"]');
      var addPlaceMenuIsOpen = false;
      var addTrackMenuIsOpen = false;
      this.placesType = mapMarkingTypes.placesType;

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
        userId: ''
      };
      var emptyPlaceObject = {
        name: '',
        type: '',
        description: '',
        location: {
          type: 'Point',
          coordinates: []
        },
        photos: [],
        userId: ''
      };
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
        this.formNewPlaceSubmitted = true;
        if (addPlaceForm.hasClass('ng-valid') && placesOnMap.coords) {
          this.newPlace.type = this.newPlaceType.type;
          this.newPlace.userId = this.user._id;
          this.newPlace.location.coordinates = placesOnMap.coords;
          console.log(this.newPlace);
          this.resetAddPlaceForm(form);
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
          //this.newPlace.location.coordinates = placesOnMap.coords;
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
      placesOnMap.removePlaces();
      placesOnMap.showMap();
      placesOnMap.initGroupsOfPlaces(this.placesType);

      // ---START---- ShowPlacesOnLoad
      // TODO: Move this inside resolve
      Place.getList({type: placesOnLoad}).then(function(result) {
        places = result;
        counter = 1;
        for (i = 0; i < places.length; i++) {
          placeObject = {id: places[i]._id, latitude: places[i].latitude,
             longitude: places[i].longitude, type: places[i].type, name: places[i].name, photo: places[i].photo[0], rate: places[i].rate};

          arrPlaces.push(placeObject);
        }
        placesOnMap.setPlaceArray(arrPlaces);
        placesOnMap.showPlaces(placesOnLoad);

        $('#' + placesOnLoad + ' span').addClass('glyphicon glyphicon-ok');
        $('#Streets span').addClass('glyphicon glyphicon-ok');
      });
      // ----END---- ShowPlacesOnLoad

      // ----START---- FilterByOneOfType
      this.checkType = function(input) {
        var spanCheck = $('#' + input + ' span');

        if (spanCheck.hasClass('glyphicon glyphicon-ok')) {
          counter--;

          spanCheck.removeClass('glyphicon glyphicon-ok');
          $('#all span').removeClass('glyphicon glyphicon-ok');

          placesOnMap.removePlaces(input);

          for (i = 0; i < arrPlaces.length; i++) {
            if (arrPlaces[i].type == input) {
              arrPlaces.splice(i--, 1);
            }
          }
        } else {
          counter++;
          spanCheck.addClass('glyphicon glyphicon-ok');

          if (counter == this.placesType.length)
            $('#all span').addClass('glyphicon glyphicon-ok');

          Place.getList({type: input}).then(function(result) {
            places = result;

            for (i = 0; i < places.length; i++) {
              placeObject = {id: places[i]._id, latitude: places[i].latitude,
             longitude: places[i].longitude, type: places[i].type, name: places[i].name, photo: places[i].photo[0], rate: places[i].rate};

              arrPlaces.push(placeObject);
            }

            placesOnMap.setPlaceArray(arrPlaces);
            placesOnMap.showPlaces(input);
          });
        }
      };
      // ----END---- FilterByOneOfType

      // ----START---- FilterCheckAll
      this.checkAll = function() {
        var spanCheck = $('#all span');

        if (spanCheck.hasClass('glyphicon glyphicon-ok')) {
          counter = 0;

          spanCheck.removeClass('glyphicon glyphicon-ok');

          for (i = 0; i < this.placesType.length; i++) {
            $('#' + this.placesType[i].type + ' span')
              .removeClass('glyphicon glyphicon-ok');
          }
          placesOnMap.removePlaces();
          arrPlaces = [];
        } else {
          counter = 5;

          placesOnMap.removePlaces();
          arrPlaces = [];

          spanCheck.addClass('glyphicon glyphicon-ok');

          for (i = 0; i < this.placesType.length; i++) {
            $('#' + this.placesType[i].type + ' span')
              .addClass('glyphicon glyphicon-ok');
          }

          Place.getList().then(function(result) {
            places = result;

            for (i = 0; i < places.length; i++) {
              placeObject = {id: places[i]._id, latitude: places[i].latitude,
              longitude: places[i].longitude, type: places[i].type, name: places[i].name, photo: places[i].photo[0], rate: places[i].rate};

              arrPlaces.push(placeObject);
            }

            placesOnMap.setPlaceArray(arrPlaces);
            placesOnMap.showPlaces();
          });
        }
      };
      // ----END---- FilterCheckAll
      this.places = arrPlaces;
      // Don't hide dropdown if clicked
      $('.dropdown-menu').on({  // changed selector from '#dropdownFilterCategory .dropdown-menu' to '.dropdown-menu'
        'click': function(e) {
          e.stopPropagation();
        }

      });

      /** * START tracks controller ***/
      var activeLiCounter = 4;

      this.tracksType = mapMarkingTypes.tracksType;
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
