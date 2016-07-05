angular.module('placeList', ['filterMapType'])
  .component('placeList', {
    templateUrl: 'components/place/place-list/place-list.template.html',
    controller: function(placesOnMap, placesType, Place) {
      var i;
      var placesOnLoad = 'featuredPlace';
      var arrPlaces = [];
      var places = [];
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

      this.types = placesType;
      placesOnMap.removePlaces();
      placesOnMap.showMap();
      placesOnMap.initGroupsOfPlaces(this.types);

      //---START---- ShowPlacesOnLoad
      Place.query({type: placesOnLoad}).$promise
        .then(function(result) {

          places = result;
          counter = 1;
          for (i = 0; i < places.length; i++) {
            placeObject = {id: places[i].id, latitude: places[i].latitude,
            longitude: places[i].longitude, type: places[i].type};

            arrPlaces.push(placeObject);
          }
          placesOnMap.setPlaceArray(arrPlaces);
          placesOnMap.showPlaces(placesOnLoad);

          $("#" + placesOnLoad + " span").addClass('glyphicon glyphicon-ok');
          $("#Streets span").addClass('glyphicon glyphicon-ok');
        });
      //----END---- ShowPlacesOnLoad

      //----START---- FilterByOneOfType
      this.checkType = function(input) {
        var spanCheck = $("#" + input + " span");

        if (spanCheck.hasClass('glyphicon glyphicon-ok')) {
          counter--;

          spanCheck.removeClass('glyphicon glyphicon-ok');
          $("#all span").removeClass('glyphicon glyphicon-ok');

          placesOnMap.removePlaces(input);

          for (i = 0; i < arrPlaces.length; i++) {
            if (arrPlaces[i].type == input) {
              arrPlaces.splice(i--, 1);
            }
          }
        } else {
          counter++;
          spanCheck.addClass('glyphicon glyphicon-ok');

          if (counter == this.types.length)
            $("#all span").addClass('glyphicon glyphicon-ok');

          Place.query({type: input}).$promise
            .then(function(result) {
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
        var spanCheck = $("#all span");

        if (spanCheck.hasClass('glyphicon glyphicon-ok')) {
          counter = 0;

          spanCheck.removeClass('glyphicon glyphicon-ok');

          for (i = 0; i < this.types.length; i++) {
            $("#" + this.types[i].type + " span")
              .removeClass('glyphicon glyphicon-ok');
          }
          placesOnMap.removePlaces();
          arrPlaces = [];
        } else {
          counter = 5;

          placesOnMap.removePlaces();
          arrPlaces = [];

          spanCheck.addClass('glyphicon glyphicon-ok');

          for (i = 0; i < this.types.length; i++) {
            $("#" + this.types[i].type + " span")
              .addClass('glyphicon glyphicon-ok');
          }

          Place.query().$promise.then(function(result) {
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
      $('#dropdownFilterCategory .dropdown-menu').on({
        "click": function(e) {
          e.stopPropagation();
        }
      });
    }
  });
