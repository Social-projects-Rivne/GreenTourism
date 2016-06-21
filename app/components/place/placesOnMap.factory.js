'use strict';

angular.module('greenTourism')
.factory('placesOnMap', ['placeModel', '$rootScope',  function(placeModel, $rootScope) {
  var placesOnMap = {};
    var arrPlaces = [];
    var self = this;
    self.mainGroup = L.markerClusterGroup.layerSupport({showCoverageOnHover: false}); // obj for marker cluster
    self.groups = []; // Array of subgroups
    self.types = [];

    placesOnMap.initGroupsOfPlaces = function(types) {
      self.types = types;
      for ( var i = 0; i < self.types.length; i++) {
        self.groups[i] = L.layerGroup();
      }
    };

    placesOnMap.showPlacesOnLoad = function(arr, pointsType) {
      var i,j;
      var marker1;
      var placesArray = [];
      placesArray = placeModel.placesArray;
      
      //self.mainGroup.addTo($rootScope.map);

      for (i = 0; i < self.types.length; i++) {
        if (self.types[i].type == pointsType) {
          for (j in placesArray) {  
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
                placesArray[j].marker=marker1;
                placesArray[j].l=L;
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

    placesOnMap.removeAllPlaces = function() {
      for ( var i = 0; i < self.types.length; i++) {
          self.mainGroup.removeLayer(self.groups[i]);
          self.groups[i].clearLayers();
      }
    };
    placesOnMap.showPoints = function(input, typesarr,pointsarr) {

        for (var j = 0; j < pointsarr.length; j++) {
            if (pointsarr[j].type == input) {
                var placeObject = {
                    id: pointsarr[j].id,
                    name: pointsarr[j].name,
                    photo: pointsarr[j].photo[0],
                    lat: pointsarr[j].lat,
                    lon: pointsarr[j].lon,
                    type: pointsarr[j].type
                };
                arrPlaces.push(placeObject);
            }

        }

        placeModel.setPlacesArray(arrPlaces);
    };
    placesOnMap.addPlaces = function(input) {
      var i,j;
      var marker;
      var placesArray = [];
      placesArray = placeModel.placesArray;

      self.mainGroup.addTo($rootScope.map);
      
      for (i = 0; i < self.types.length; i++) {
        if (self.types[i].type == input) {
          for (var j in placesArray) {  
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
              placesArray[j].marker=marker;
              placesArray[j].l=L;
              marker.addTo(self.groups[i]); 
            }
          }
        }
        self.mainGroup.checkIn(self.groups[i]);
        self.groups[i].addTo($rootScope.map);
      }
    };


  return placesOnMap;
}]);