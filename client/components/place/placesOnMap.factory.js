angular.module('mapModule')
  .factory('placesOnMap', ['mapFactory', 'mapMarkingTypes', function(mapFactory, mapMarkingTypes) {
    var placesOnMap = {};
    var mainGroup = L.markerClusterGroup
      .layerSupport({showCoverageOnHover: false});
    var groups = [];
    var types = [];
    var map;
    placesOnMap.places = {
      camp: [],
      service: [],
      hostes: [],
      featured: [],
      healthcare: []
    };

    var marker = function(lon, lat, icon) {
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
      return map;
    };

    placesOnMap.initGroupsOfPlaces = function(inpTypes) {
      types = inpTypes;
      for (var key in types) {
        if ({}.hasOwnProperty.call(types, key)) {
          groups[key] = L.layerGroup();
        }
      }
    };

    placesOnMap.showPlaces = function(places, input) {
      mainGroup.addTo(map);
      if (input) {
        places.forEach(function(place) {
          var newPlace = marker(place.location.coordinates[0], place.location.coordinates[1], types[input].icon)
            .addTo(groups[input])
            .bindPopup('<div class=\'popup  center-block\'><h3>' + place.name + '</h3><a><img class=\'marker-image\' src=\'assets/' + place.photos[0] + '\' \/></a>' +
              '<br /><br /><button type=\'button\' class=\'btn btn-default btn-md center-block\'> <a href=\'#!/places/' + place._id + '\'>Details >></a> </button></div>', {autoPan: false});
          newPlace.name = place.name;
          newPlace._id = place._id;
          placesOnMap.places[place.type].push(newPlace);
        });
        mainGroup.checkIn(groups[input]);
        groups[input].addTo(map);
      } else {
        places.forEach(function(place) {
          var newPlace = marker(place.location.coordinates[0], place.location.coordinates[1], types[place.type].icon)
            .addTo(groups[place.type])
            .bindPopup('<div class=\'popup  center-block\'><h3>' + place.name + '</h3><a><img class=\'marker-image\' src=\'assets/' + place.photos[0] + '\' \/></a>' +
              '<br /><br /><button type=\'button\' class=\'btn btn-default btn-md center-block\'> <a href=\'#!/places/' + place._id + '\'>Details >></a> </button></div>', {autoPan: false});
          newPlace.name = place.name;
          newPlace._id = place._id;
          placesOnMap.places[place.type].push(newPlace);
        });
        for (var type in types) {
          mainGroup.checkIn(groups[type]);
          groups[type].addTo(map);
        }
      }

      map.on('click move', function() {
        map.closePopup();
      });
    };

    placesOnMap.removePlaces = function(input) {
      if (input) {
        mainGroup.checkOut(groups[input]);
        groups[input].clearLayers();
        placesOnMap.places[input] = [];
      } else {
        for (var type in types) {
          mainGroup.checkOut(groups[type]);
          groups[type].clearLayers();
        }
        for (var placeType in placesOnMap.places) {
          placesOnMap.places[placeType] = [];
        }
      }
    };

    /* ** START tracks factory ** */
    var tracks = [];
    var trackForAdding;
    var polyline = function(trackPoints, color) {
      return L.polyline(trackPoints, {
        color: (color ? color : '#000'),
        opacity: 1
      });
    };

    placesOnMap.showTracks = function(tracksArray, isCreateMode) {
      if (isCreateMode && placesOnMap.newTrack) {
        map.removeLayer(placesOnMap.newTrack);
      }
      tracksArray.forEach(function(track) {
        if (track.type) {
          var color = mapMarkingTypes.tracks[track.type].color;
        }
        var coordsArray = [];
        if (track.location) {
          track.location.coordinates.forEach(function(coord, index) {
            var coords = [];
            coords[0] = coord[1];
            coords[1] = coord[0];
            coordsArray[index] = coords;
          });
        }
        trackForAdding = polyline(coordsArray, color).addTo(map);
        if (isCreateMode) {
          placesOnMap.newTrack = trackForAdding;
        }
        tracks.push([trackForAdding, track.type]);
      });
    };

    placesOnMap.removeTracks = function(tracksType) {
      tracks.forEach(function(track) {
        if (tracksType) {
          if (track[1] == tracksType) {
            map.removeLayer(track[0]);
          }
        } else {
          map.removeLayer(track[0]);
        }
      });
    };

    /* ** START add place factory ** */
    var newMarker;
    placesOnMap.openAddPlaceMenu = function() {
      map.on('click', addNewPlaceOnMap);
    };

    placesOnMap.closeAddPlaceMenu = function() {
      map.off('click', addNewPlaceOnMap);
    };

    function addNewPlaceOnMap(e) {
      var latitudeContainer = angular.element('#latitude');
      var longitudeContainer = angular.element('#longitude');
      placesOnMap.coords = [e.latlng.lng, e.latlng.lat];
      placesOnMap.coordsIsDefined = true;
      if (newMarker) {
        map.removeLayer(newMarker);
      }
      newMarker = L.marker([placesOnMap.coords[1], placesOnMap.coords[0]]).addTo(map);
      latitudeContainer.text('Latitude: ' + newMarker._latlng.lat);
      longitudeContainer.text('Longitude: ' + newMarker._latlng.lng);
    }

    placesOnMap.removeNewMarker = function() {
      if (newMarker) {
        map.removeLayer(newMarker);
      }
    };

    return placesOnMap;
  }]);
