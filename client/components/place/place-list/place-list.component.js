angular.module('placeList', ['filterMapType'])
  .component('placeList', {
    templateUrl: 'components/place/place-list/place-list.template.html',
    controller: ['placesOnMap', 'mapMarkingTypes', 'Place', 'Track', 'currentUser',
      function(placesOnMap, mapMarkingTypes, Place, Track, currentUser) {
        var placesOnLoad = 'featuredPlace';
        var checkedClass = 'glyphicon glyphicon-ok';
        var places = [];
        var tracks = [];
        var counter;

        this.user = currentUser;

        //-----START ADD Place-----
        /*this.addPlaceState = false;

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
        };*/
        //-----END ADD Place-----

        this.placesType = mapMarkingTypes.placesType;  //Renamed types to placesType
        placesOnMap.removePlaces();
        placesOnMap.showMap();
        placesOnMap.initGroupsOfPlaces(this.placesType);

        //---START---- ShowPlacesOnLoad
        // TODO: Move this inside resolve
        Place.getList({type: placesOnLoad}).then(function(result) {
          counter = 1;
          places = result.concat(places);
          placesOnMap.showPlaces(places, placesOnLoad);
          angular.element('#' + placesOnLoad + ' span').addClass(checkedClass);
          angular.element('#Streets span').addClass(checkedClass);
        });
        //----END---- ShowPlacesOnLoad

        //----START---- FilterByOneOfType
        this.checkType = function(input) {
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
        //----END---- FilterByOneOfType

        //----START---- FilterCheckAll
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
        //----END---- FilterCheckAll

        this.places = places;

        //Don't hide dropdown if clicked
        angular.element('.dropdownFilter').on({
          'click': function(e) {
            e.stopPropagation();
          }
        });


        /*** START tracks controller ***/
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
