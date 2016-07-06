angular.module('placeList', ['filterMapType'])
  .component('placeList', {
    templateUrl: 'components/place/place-list/place-list.template.html',
    controller: ['placesOnMap', 'mapMarkingTypes', 'Place', 'Track', function(placesOnMap, mapMarkingTypes, Place, Track) {
      var i;
      var placesOnLoad = 'featuredPlace';
      var arrPlaces = [];
      var places = [];
      var tracks = [];
      var placeObject = {};
      var counter;

      //-----START ADD Place-----
      this.addPlaceState = false;

      this.toggleAddPlace = function() {
        this.addPlaceState = !this.addPlaceState;
      };

      // TODO: Move this to it's own contoller (or component)
      this.newPlace = {};

      this.addNewPlace = function(newPlace) {
        var place = new Place(newPlace);
        place.$save();
        alert('Place saved to db!');

        this.toggleAddPlace();
        document.forms.addPlace.reset();
        this.newPlace = {};

        this.addPlaceOnMap(L.latLng(place.latitude,
          place.longitude));
      };

      // TODO: Move this inside map
      this.addPlaceOnMap = function(latLng) {
        L.marker(latLng).addTo($rootScope.map);
        $rootScope.map.setView(latLng);
      };
      //-----END ADD Place-----

      this.placesType = mapMarkingTypes.placesType;  //DG: Rename types to placesType
      placesOnMap.removePlaces();
      placesOnMap.showMap();
      placesOnMap.initGroupsOfPlaces(this.placesType);

      //---START---- ShowPlacesOnLoad
      // TODO: Move this inside resolve
      Place.getList({type: placesOnLoad}).then(function(result) {
        places = result;
        counter = 1;
        for (i = 0; i < places.length; i++) {
          placeObject = {id: places[i].id, latitude: places[i].latitude,
          longitude: places[i].longitude, type: places[i].type};

          arrPlaces.push(placeObject);
        }
        placesOnMap.setPlaceArray(arrPlaces);
        placesOnMap.showPlaces(placesOnLoad);

        $('#' + placesOnLoad + ' span').addClass('glyphicon glyphicon-ok');
        $('#Streets span').addClass('glyphicon glyphicon-ok');
      });
      //----END---- ShowPlacesOnLoad

      //----START---- FilterByOneOfType
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
              placeObject = {id: places[i].id, latitude: places[i].latitude,
              longitude: places[i].longitude, type: places[i].type};

              arrPlaces.push(placeObject);
            }

            placesOnMap.setPlaceArray(arrPlaces);
            placesOnMap.showPlaces(input);
          });
        }
      };
      //----END---- FilterByOneOfType

      //----START---- FilterCheckAll
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
              placeObject = {id: places[i].id, latitude: places[i].latitude,
                  longitude: places[i].longitude, type: places[i].type
                  };

              arrPlaces.push(placeObject);
            }

            placesOnMap.setPlaceArray(arrPlaces);
            placesOnMap.showPlaces();
          });
        }
      };
      //----END---- FilterCheckAll

      //Don't hide dropdown if clicked
      $('.dropdown-menu').on({  // DG: change selector from '#dropdownFilterCategory .dropdown-menu' to '.dropdown-menu'
        'click': function(e) {
          e.stopPropagation();
        }

      });


      /*** START tracks controller ***/
      this.tracksType = mapMarkingTypes.tracksType;
      Track.getList().then(function(result) {
        tracks = result;
        placesOnMap.showTracks(tracks);
      });

      this.showSpecificTracks = function(tracksType) {
        var element = angular.element('#' + tracksType);
        var checkedIcon = angular.element('#gi' + tracksType);

        if (element.hasClass('active')) {
          element.removeClass('active');
          checkedIcon.removeClass('glyphicon-ok');
          placesOnMap.removeTracks(tracksType);
        } else {
          element.addClass('active');
          checkedIcon.addClass('glyphicon-ok');
          Track.getList({type: tracksType}).then(function(result) {
            tracks = result;
            placesOnMap.showTracks(tracks);
          });
        }
      };

      this.checkAllTracks = function() {
        var checkAllElement = angular.element('#allTracks');
        var allLiElements = angular.element(document).find('#tracksFilter li > a');
        var allGI = angular.element('#tracksFilter li span.glyphicon');
        if (checkAllElement.hasClass('active')) {
          allLiElements.removeClass('active');
          allGI.removeClass('glyphicon-ok');
          placesOnMap.removeAllTracks();
        } else {
          allLiElements.addClass('active');
          allGI.addClass('glyphicon-ok');
          Track.getList().then(function(result) {
            tracks = result;
            placesOnMap.showTracks(tracks);
          });
        }
      };
    }]
  });
