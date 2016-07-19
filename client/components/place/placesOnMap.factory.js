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
      return L.marker([lat, lon], {
        icon: L.icon({
          iconUrl: icon,
          shadowUrl: 'assets/img/places/marker/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        })
      });
    };

    placesOnMap.showMap = function() {
      map = mapFactory.showMap();
    };

    placesOnMap.initGroupsOfPlaces = function(inpTypes) {
      types = inpTypes;
      types.forEach(function(type, i) {
        groups[i] = L.layerGroup();
      });
    };

    placesOnMap.showPlaces = function(places, input) {
      mainGroup.addTo(map);

      types.forEach(function(placeType, i) {
        if (input) {
          if (placeType.type == input) {
            places.forEach(function(place) {
              if (place.type == input) {
                marker(place.location.coordinates[0], place.location.coordinates[1], placeType.icon)
                  .addTo(groups[i])
                  .bindPopup("<div class='popup  center-block'><h3>" + place.name + "</h3><a><img class='marker-image' src='assets/" + place.photos[0] + "' \/></a>" +
                    "<br /><br /><button type='button' class='btn btn-default btn-md center-block'> <a href='#!/places/" + place._id + "'>Details >></a> </button></div>", {autoPan: false})
                  .openPopup();
              }
            });
          }
        } else {
          places.forEach(function(place) {
            if (place.type == placeType.type) {
              marker(place.location.coordinates[0], place.location.coordinates[1], placeType.icon)
                .addTo(groups[i])
                .bindPopup("<div class='popup  center-block'><h3>" + place.name + "</h3><a><img class='marker-image' src='assets/" + place.photos[0] + "' \/></a>" +
                  "<br /><br /><button type='button' class='btn btn-default btn-md center-block'> <a href='#!/places/" + place._id + "'>Details >></a> </button></div>", {autoPan: false})
                .openPopup();
            }
          });
        }
        mainGroup.checkIn(groups[i]);
        groups[i].addTo(map);
        map.on('click move', function() {
          map.closePopup()
        });
      });
    };

    placesOnMap.removePlaces = function(input) {
      types.forEach(function(placeType, i) {
        if (input) {
          if (placeType.type == input) {
            mainGroup.checkOut(groups[i]);
            groups[i].clearLayers();
          }
        } else {
          mainGroup.checkOut(groups[i]);
          groups[i].clearLayers();
        }
      })
    };
    placesOnMap.placeArr = [];
    placesOnMap.setPlaceArr = function (place) {
      placesOnMap.placeArr = place;
    };
    placesOnMap.getPlaceArr = function () {
      return placesOnMap.placeArr;
    };
    /* ** START tracks factory ** */
    var tracks = [];
    var polyline = function(trackPoints, color) {
      return L.polyline(trackPoints, {
        color: color,
        opacity: 1
      });
    };

    placesOnMap.showTracks = function(tracksArray) {
      var trackForAdding;
      for (var i = 0; i < tracksArray.length; i++) {
        trackForAdding = polyline(tracksArray[i].track_points, tracksArray[i].color).addTo(map);
        tracks.push([trackForAdding, tracksArray[i].type]);
      }
    };

    placesOnMap.removeTracks = function(tracksType) {
      for (var i = 0; i < tracks.length; i++) {
        if (tracks[i][1] === tracksType) {
          map.removeLayer(tracks[i][0]);
        }
      }
    };

    placesOnMap.removeAllTracks = function() {
      for (var i = 0; i < tracks.length; i++) {
        map.removeLayer(tracks[i][0]);
      }
    };

    return placesOnMap;
  }]);