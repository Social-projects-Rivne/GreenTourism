'use strict';

angular.module('filterCategory', ['ngResource'])
  .component('filterCategory', {
    templateUrl: 'components/place/filter-category/filter-category.template.html',
    controller: function FilterCategoryController($http, $rootScope, placeModel, placesOnMap, $timeout, $scope) {
      var self = this;
      var j; // counters
      var firstCheck = true; // variable for first check onload
      var pointsTypeForShowOnLoad = 'Featured_Place';
      var arrPlaces = [];

      self.types = placeModel.getPlaceTypes.query();
      //Get place.data

      var ischecked = false;
      //Define method for show and hide all types of places
      this.showhidePlaces = function(input) {
        arrPlaces = placeModel.placesArray;
        var inputButton = angular.element("#" + input);
        var spanCheck = angular.element("#" + input + " span");
        if (inputButton.hasClass('checked')) {
          firstCheck = false;
          ischecked = true;
          spanCheck.removeClass('glyphicon glyphicon-ok');
          inputButton.removeClass('checked');
          placesOnMap.removePlaces(input);
          for (j = 0; j < arrPlaces.length; j++) {
            if (arrPlaces[j].type == input) {
              arrPlaces.splice(j--, 1);
            }
          }

        } else {
          ischecked = false;
          spanCheck.addClass('glyphicon glyphicon-ok');
          inputButton.addClass('checked');

        }

        $scope.$emit('changetype', arrPlaces, ischecked, input, firstCheck);

      };

      //Don't hide dropdown if clicked
      angular.element('#dropdownFilterCategory .dropdown-menu').on({
        "click": function(e) {
          e.stopPropagation();
        }
      });

      //Checked pointsTypeForShowOnLoad in Place category
      angular.element('#dropdownFilterCategory').on({
        "click": function() {
          if (firstCheck) {
            angular.element("#" + pointsTypeForShowOnLoad).addClass('checked');
            angular.element("#" + pointsTypeForShowOnLoad + " span").addClass('glyphicon glyphicon-ok');
          }
        }
      });
    }

  });
