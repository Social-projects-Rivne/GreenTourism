angular.module('mapModule')
  .factory('placesOnMap', ['mapFactory', 'mapMarkingTypes', function(mapFactory, mapMarkingTypes) {
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
                  .bindPopup('<div class="popup  center-block"><h3>' + place.name + '</h3><a><img class="marker-image" src="assets/' + place.photos[0] + '" \/></a>' +
                    '<br /><br /><button type="button" class="btn btn-default btn-md center-block"> <a href="#!/places/' + place._id + '">Details >></a> </button></div>', {autoPan: false})
                  .openPopup();
              }
            });
          }
        } else {
          places.forEach(function(place) {
            if (place.type == placeType.type) {
              marker(place.location.coordinates[0], place.location.coordinates[1], placeType.icon)
                .addTo(groups[i])
                .bindPopup('<div class="popup  center-block"><h3>' + place.name + '</h3><a><img class="marker-image" src="assets/' + place.photos[0] + '" \/></a>' +
                  '<br /><br /><button type="button" class="btn btn-default btn-md center-block"> <a href="#!/places/' + place._id + '">Details >></a> </button></div>', {autoPan: false})
                .openPopup();
            }
          });
        }
        mainGroup.checkIn(groups[i]);
        groups[i].addTo(map);
        map.on('click move', function() {
          map.closePopup();
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
      });
    };

    /* ** START tracks factory ** */
    var tracks = [];
    var trackForAdding;
    var polyline = function(trackPoints, color) {
      return L.polyline(trackPoints, {
        color: color,
        opacity: 1
      });
    };

    var addTrack = function(track) {
      var color = mapMarkingTypes.tracks[track.type].color;
      trackForAdding = polyline(track.location.coordinates, color).addTo(map);
      tracks.push([trackForAdding, track.type]);
    };

    var removeTrack = function(track) {
      if (this == 'all') {
        map.removeLayer(track[0]);
      } else {
        if (track[1] == this) {
          map.removeLayer(track[0]);
        }
      }
    };

    placesOnMap.showTracks = function(tracksArray) {
      tracksArray.forEach(addTrack);
    };

    placesOnMap.removeTracks = function(tracksType) {
      tracks.forEach(removeTrack, tracksType);
    };

    placesOnMap.removeAllTracks = function() {
      tracks.forEach(removeTrack, 'all');
    };

  /* ** START add place factory ** */
    var newMarker;
    var latitudeContainer = angular.element('#latitude');
    var longitudeContainer = angular.element('#longitude');
    placesOnMap.openAddPlaceMenu = function() {
      map.on('click', addNewPlace);
    };

    placesOnMap.closeAddPlaceMenu = function() {
      map.off('click', addNewPlace);
    };

    function addNewPlace(e) {
      placesOnMap.coords = [e.latlng.lat, e.latlng.lng];
      if (newMarker) {
        map.removeLayer(newMarker);
      }
      newMarker = L.marker(placesOnMap.coords).addTo(map);
      latitudeContainer.text('Latitude: ' + newMarker._latlng.lat);
      longitudeContainer.text('Longitude: ' + newMarker._latlng.lng);
    }

    placesOnMap.removeNewMarker = function() {
      if (newMarker) {
        map.removeLayer(newMarker);
      }
    };

    placesOnMap.openAddTrackMenu = function() {
      map.on('click', addNewTrack);
    };

    placesOnMap.closeAddTrackMenu = function() {
      map.off('click', addNewTrack);
    };

    function addNewTrack(e) {
      console.log(true);
    }

    return placesOnMap;
  }]);
