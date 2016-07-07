angular.module('mapModule')
.factory('placesOnMap', ['mapFactory', function(mapFactory) {
  var placesOnMap = {};
  var mainGroup = L.markerClusterGroup
                    .layerSupport({showCoverageOnHover: false});
  var groups = [];
  var types = [];
  var places = [];
  var map;

  var marker = function(lat, lon, icon) {
    return L.marker([lat, lon], {icon:
                    L.icon({
                      iconUrl: icon,
                      shadowUrl: 'assets/img/places/marker/marker-shadow.png',
                      iconSize: [25, 41],
                      iconAnchor: [12, 41],
                      popupAnchor: [1, -34],
                      shadowSize: [41, 41]
                    })});
  };

  placesOnMap.setPlaceArray = function(arr) {
    places = arr;
  };

  placesOnMap.showMap = function() {
    map = mapFactory.showMap();
  };

  placesOnMap.initGroupsOfPlaces = function(inpTypes) {
    types = inpTypes;
    for (var i = 0; i < types.length; i++) {
      groups[i] = L.layerGroup();
    }
  };

   placesOnMap.showPlaces = function(input) {
    var i;
    var j;
    mainGroup.addTo(map);
    for (i = 0; i < types.length; i++) {
      if (input) {
        if (types[i].type == input) {
          for (j in places) {
            if (places[j].type == input) {
              marker(places[j].latitude, places[j].longitude, types[i].icon)
                  .addTo(groups[i])
                  .bindPopup("<div class='popup  center-block'><h3>" + places[j].name + "</h3><a><img class='marker-image' src='assets/" + places[j].photo + "' \/></a>" +
                      "<br /><br /><button type='button' class='btn btn-default btn-md center-block'> <a href='#!/places/"+places[j].id+"'>Details >></a> </button></div>", {autoPan:false})
                  .openPopup();

            }
          }
        }
      } else {
        for (j in places) {
          if (places[j].type == types[i].type) {
            marker(places[j].latitude, places[j].longitude, types[i].icon)
              .addTo(groups[i])
                .bindPopup("<div class='popup  center-block'><h3>" + places[j].name + "</h3><a><img class='marker-image' src='assets/" + places[j].photo + "' \/></a>" +
                    "<br /><br /><button type='button' class='btn btn-default btn-md center-block'> <a href='#!/places/"+places[j].id+"'>Details >></a> </button></div>", {autoPan:false})
                .openPopup();
          }
        }
      }
      mainGroup.checkIn(groups[i]);
      groups[i].addTo(map);
      map.on('click move', function(){
      map.closePopup()
      });

    }
  };

  placesOnMap.removePlaces = function(input) {
    for (var i = 0; i < types.length; i++) {
      if (input) {
        if (types[i].type == input) {
          mainGroup.checkOut(groups[i]);
          groups[i].clearLayers();
        }
      } else {
        mainGroup.checkOut(groups[i]);
        groups[i].clearLayers();
      }
    }
  };

  return placesOnMap;
}]);
