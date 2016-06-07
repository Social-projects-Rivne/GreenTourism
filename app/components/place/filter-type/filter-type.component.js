'use strict';

angular.module('filterType',[])
  .component('filterType', {
    templateUrl: 'components/place/filter-type/filter-type.template.html',
    controller: 
      function FilterTypeController($http) {
        var self = this;

        //Get place.data
        $http.get('components/place/place.data.json').then(function(response) {
          self.points = response.data;
        });

        //Get types data
        $http.get('components/place/types.data.json').then(function(response) {
          self.types = response.data;
        });

        //Show map
        var map = L.map('map').setView([50.6234, 26.2189], 13);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        //Define array for markers and filterArray - with all data of point
        var filterArray = [];
        var markers = [];

        //Define method for show and hide all types of places    
        this.showhidePlaces = function(input) {
          var inputButton = document.getElementsByName(input)[0]; //get element, which was clicked
          var classSearch = inputButton.className;  //get className of search element
          var spanCheck = inputButton.getElementsByTagName('span')[0];  //get span from clicked element, which add glyphicon icon for checked type

          if (/checked/.test(classSearch)) {
            spanCheck.className = '';
            inputButton.className = inputButton.className.replace(" checked", "");
            for (var i = 0; i < filterArray.length; i++) {
              if (filterArray[i].type == input) {
                map.removeLayer(markers[i]);
                markers.splice(i, 1);
                filterArray.splice(i, 1);
                i--;
              }
            }
          } else {
              spanCheck.className = 'badge glyphicon glyphicon-ok';
              inputButton.className += ' checked';
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
                      })}).addTo(map);
                  }
                  markers.push(marker);
                }
              }
            }
        };

        //Don't hide dropdown if clicked
        $('#dropdownFilterType .dropdown-menu').on({
          "click":function(e){
            e.stopPropagation();
          }
        });
      }
  });
