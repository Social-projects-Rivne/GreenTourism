'use strict';

angular.module('filterCategory',[])
  .component('filterCategory', {
    templateUrl: 'components/place/filter-category/filter-category.template.html',
    controller:
      function FilterCategoryController($http, $rootScope, placeModel, placesOnMap) {
        var self = this;
        var i, j; // counters
        var firstCheck; // variable for first check onload
        var pointsTypeForShowOnLoad = 'Featured_Place';
        var arrPlaces = [];
        var placeObject = {};

        //Get place.data
        $http.get('components/place/place.data.json').then(function(response) {
          self.points = response.data;
        });

        //Get types.data
        $http.get('components/place/types.data.json').then(function(response) {
          self.types = response.data;

          placesOnMap.initGroupsOfPlaces(self.types);

          self.showPointsOnLoad(pointsTypeForShowOnLoad);
        });

        //Function for showing points onload by one of type
        this.showPointsOnLoad = function(pointsType) {
          for (i = 0; i < self.types.length; i++) {
            if (self.types[i].type == pointsType) {
              for (j = 0; j < self.points.length; j++) {
                if (self.points[j].type == pointsType) {
                  placeObject = {id: this.points[j].id, lat: this.points[j].lat, lon: this.points[j].lon, type: this.points[j].type};

                  arrPlaces.push(placeObject);
                  firstCheck = true;
                }
              }
            }
          }
          placesOnMap.showPlacesOnLoad(arrPlaces, pointsType);
        };

        placesOnMap.removeAllPlaces(); //Remove all places before use filters

        //Define method for show and hide all types of places
        this.showhidePlaces = function(input) {
          var inputButton = angular.element("#" + input);
          var spanCheck = angular.element("#" + input + " span");

          if (inputButton.hasClass('checked')) {
            firstCheck = false;
            spanCheck.removeClass('glyphicon glyphicon-ok');
            inputButton.removeClass('checked');

            placesOnMap.removePlaces(input);

            for (j = 0; j < arrPlaces.length; j++) {
              if (arrPlaces[j].type == input) {
                arrPlaces.splice(j--, 1);
              }
            }
          } else {
              spanCheck.addClass('glyphicon glyphicon-ok');
              inputButton.addClass('checked');

              for (i = 0; i < this.types.length; i++) {
                if (this.types[i].type == input) {
                  for (j = 0; j < this.points.length; j++) {
                    if (this.points[j].type == input) {
                      placeObject = {id: this.points[j].id, lat: this.points[j].lat, lon: this.points[j].lon, type: this.points[j].type};

                      arrPlaces.push(placeObject);
                    }
                  }
                }
              }
            }
            placeModel.setPlacesArray(arrPlaces);
            placesOnMap.addPlaces(input);
        };

        //Don't hide dropdown if clicked
        angular.element('#dropdownFilterCategory .dropdown-menu').on({
          "click":function(e){
            e.stopPropagation();
          }
        });

        //Checked pointsTypeForShowOnLoad in Place category
        angular.element('#dropdownFilterCategory').on({
          "click":function(){
            if (firstCheck) {
              angular.element("#" + pointsTypeForShowOnLoad).addClass('checked');
              angular.element("#" + pointsTypeForShowOnLoad + " span").addClass('glyphicon glyphicon-ok');
            }
          }
        });
      }
  });
