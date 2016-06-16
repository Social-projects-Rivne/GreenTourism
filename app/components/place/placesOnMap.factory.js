'use strict';

angular.module('greenTourism')
.factory('placesOnMap', ['placeModel', '$rootScope', function(placeModel, $rootScope) {
  var placesOnMap = {};
    var self = this;
    self.mainGroup = L.markerClusterGroup.layerSupport(); // obj for marker cluster
    self.groups = []; // Array of subgroups
    self.types = [];
    
    placesOnMap.initGroupsOfPlaces = function(types) {
      self.types = types;
      for ( var i = 0; i < self.types.length; i++) {
        self.groups[i] = L.layerGroup();
      }
    };

    placesOnMap.showPlacesOnLoad = function(arr, pointsType) {
      console.log(arr);
      var i,j;
      var marker1;
      var placesArray = [];
      placesArray = arr;

      //self.mainGroup.addTo($rootScope.map);

      for (i = 0; i < self.types.length; i++) {
        if (self.types[i].type == pointsType) {
          for (j = 0; j < placesArray.length; j++) {  
            if (placesArray[j].type == pointsType) {
              marker1 = L.marker([placesArray[j].lat, placesArray[j].lon], {icon: 
                        L.icon ({
                          iconUrl: self.types[i].icon,
                          shadowUrl: 'assets/img/places/marker/marker-shadow.png',
                          iconSize: [25, 41],
                          iconAnchor: [12, 41],
                          popupAnchor: [1, -34],
                          shadowSize: [41, 41]
                        })});
              marker1.addTo(self.groups[i]); 
            }
          }
          //self.mainGroup.checkIn(self.groups[i]);
          self.groups[i].addTo($rootScope.map);
        }
        
      }
    };

    placesOnMap.removePlaces = function(input) {
      for ( var i = 0; i < self.types.length; i++) {
        if (self.types[i].type == input) {
          self.mainGroup.removeLayer(self.groups[i]);
          self.groups[i].clearLayers();
        }
      }
    };

    placesOnMap.addPlaces = function(input) {
      var i,j;
      var marker;
      var placesArray = [];
      placesArray = placeModel.placesArray;

      //self.mainGroup.addTo($rootScope.map);
      
      for (i = 0; i < self.types.length; i++) {
        if (self.types[i].type == input) {
          for (j = 0; j < placesArray.length; j++) {  
            if (placesArray[j].type == input) {
              marker = L.marker([placesArray[j].lat, placesArray[j].lon], {icon: 
                        L.icon ({
                          iconUrl: self.types[i].icon,
                          shadowUrl: 'assets/img/places/marker/marker-shadow.png',
                          iconSize: [25, 41],
                          iconAnchor: [12, 41],
                          popupAnchor: [1, -34],
                          shadowSize: [41, 41]
                        })});
              marker.addTo(self.groups[i]); 
            }
          }
        }
        //self.mainGroup.checkIn(self.groups[i]);
        self.groups[i].addTo($rootScope.map);
      }
    };

  return placesOnMap;
}]);