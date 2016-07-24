angular.module('placeList', ['filterMapType', 'popularTracks'])
  .component('placeList', {
    templateUrl: 'components/place/place-list/place-list.template.html',
    controller: ['placesOnMap', 'mapMarkingTypes', 'Place', 'Track', 'currentUser', 'constants',
      function(placesOnMap, mapMarkingTypes, Place, Track, currentUser, constants) {
        var places = [];
        var tracks = [];
        var counter;
        var typesLength;

        this.user = currentUser;

        this.placesType = mapMarkingTypes.places;
        typesLength = Object.keys(this.placesType).length;
        placesOnMap.removePlaces();
        placesOnMap.showMap();
        placesOnMap.initGroupsOfPlaces(this.placesType);

        //---START---- ShowPlacesOnLoad
        // TODO: Move this inside resolve
        Place.getList({type: constants.placesOnLoad}).then(function(result) {
          counter = 1;
          places = result.concat(places);
          placesOnMap.showPlaces(result, constants.placesOnLoad);
          angular.element('#' + constants.placesOnLoad + ' span').addClass(constants.checkedClass);
          angular.element('#Streets span').addClass(constants.checkedClass);
          placesOnMap.setPlaceArr(places);
        });
        //----END---- ShowPlacesOnLoad

        //----START---- FilterByOneOfType
        this.checkType = function(input) {
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
        this.checkAll = function() {
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

        this.places = places;

        //Don't hide dropdown if clicked
        angular.element('.dropdownFilter').on({
          'click': function(e) {
            e.stopPropagation();
          }
        });


        /*** START tracks controller ***/
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