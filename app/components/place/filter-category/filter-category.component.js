'use strict';

angular.module('filterCategory',[])
  .component('filterCategory', {
    templateUrl: 'components/place/filter-category/filter-category.template.html',
    controller: 
      function FilterCategoryController($http, $rootScope) {
        var self = this;

        //Get place.data
        $http.get('components/place/place.data.json').then(function(response) {
          self.points = response.data;
        });

        //Get types.data
        $http.get('components/place/types.data.json').then(function(response) {
          self.types = response.data;
        });

        var filterArray = [];
        var markers = [];
        //Define method for show and hide all types of places    
        this.showhidePlaces = function(input) {
          var inputButton = angular.element("#" + input);
          var spanCheck = angular.element("#" + input + " span");

          if (inputButton.hasClass('checked')) {
            spanCheck.removeClass('glyphicon glyphicon-ok');
            inputButton.removeClass('checked');
            for (var i = 0; i < filterArray.length; i++) {
              if (filterArray[i].type == input) {
                $rootScope.map.removeLayer(markers[i]);
                markers.splice(i, 1);
                filterArray.splice(i, 1);
                i--;
              }
            }
          } else {
              spanCheck.addClass('glyphicon glyphicon-ok');
              inputButton.addClass('checked');
              for (var key in this.points) {
                if (this.points[key].type == input) {
                  filterArray.push(this.points[key]);
                  for (var keyType in this.types) {
                    if (this.types[keyType].type == input)       
                      var marker = L.marker([this.points[key].lat, this.points[key].lon], {icon: 
                      L.icon ({
                        iconUrl: this.types[keyType].icon,
                        shadowUrl: 'assets/img/places/marker/marker-shadow.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41]
                      })}).addTo($rootScope.map);
                  }
                  markers.push(marker);
                }
              }
            }
        };

        //Don't hide dropdown if clicked
        angular.element('#dropdownFilterCategory .dropdown-menu').on({
          "click":function(e){
            e.stopPropagation();
          }
        });
      }
  });
