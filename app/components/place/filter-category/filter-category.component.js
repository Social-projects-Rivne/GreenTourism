'use strict';

angular.module('filterCategory',[])
  .component('filterCategory', {
    templateUrl: 'components/place/filter-category/filter-category.template.html',
    controller: 
      function FilterCategoryController($http, $rootScope) {
        var self = this;
        var i, j; // counters
        var mainGroup = L.markerClusterGroup.layerSupport(); // obj for marker cluster
        var groups = []; // Array of subgroups
        var marker; // point
        var firstCheck; // variable for first check onload
        var pointsTypeForShowOnLoad = 'Featured_Place';
        
        //Get place.data
        $http.get('components/place/place.data.json').then(function(response) {
          self.points = response.data;
        });

        //Get types.data
        $http.get('components/place/types.data.json').then(function(response) {
          self.types = response.data;
          
          // Loop for identify subgroups. One subgroup is one type of places
          for ( i = 0; i < self.types.length; i++) {
            groups[i] = L.layerGroup();
          }

          self.showPointsOnLoad(pointsTypeForShowOnLoad);        
        });
        
        //Function for showing points onload by one of type
        this.showPointsOnLoad = function(pointsType) {
          for (i = 0; i < self.types.length; i++) {
            if (self.types[i].type == pointsType) {
              for (j = 0; j < self.points.length; j++) {
                if (self.points[j].type == pointsType) {
                  marker = L.marker([self.points[j].lat, self.points[j].lon], {icon: 
                  L.icon ({
                    iconUrl: self.types[i].icon,
                    shadowUrl: 'assets/img/places/marker/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                  })});

                  marker.addTo(groups[i]);
                  firstCheck = true;
                }
              }
            }
            mainGroup.checkIn(groups[i]);
            groups[i].addTo($rootScope.map);
          }
        };
        
        //Define method for show and hide all types of places    
        this.showhidePlaces = function(input) {
          var inputButton = angular.element("#" + input);
          var spanCheck = angular.element("#" + input + " span");
          
          mainGroup.addTo($rootScope.map);

          if (inputButton.hasClass('checked')) {
            firstCheck = false;
            spanCheck.removeClass('glyphicon glyphicon-ok');
            inputButton.removeClass('checked');
            
            for ( i = 0; i < this.types.length; i++) {
              if (this.types[i].type == input) {
                mainGroup.removeLayer(groups[i]);
                groups[i].clearLayers();
              }
            }
          } else {
              spanCheck.addClass('glyphicon glyphicon-ok');
              inputButton.addClass('checked');

              for (i = 0; i < this.types.length; i++) {
                if (this.types[i].type == input) {
                  for (j = 0; j < this.points.length; j++) {
                    if (this.points[j].type == input) {
                      marker = L.marker([this.points[j].lat, this.points[j].lon], {icon: 
                      L.icon ({
                        iconUrl: this.types[i].icon,
                        shadowUrl: 'assets/img/places/marker/marker-shadow.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41]
                      })});

                      marker.addTo(groups[i]);
                    }
                  }
                }
                mainGroup.checkIn(groups[i]);
                groups[i].addTo($rootScope.map);
              }
            }
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
