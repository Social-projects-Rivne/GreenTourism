angular.module('mapModule')
  .factory('placesOnMap', ['mapFactory', 'mapMarkingTypes', function(mapFactory, mapMarkingTypes) {
    var placesOnMap = {};
    var mainGroup = L.markerClusterGroup
      .layerSupport({showCoverageOnHover: false});
    var groups = [];
    var types = [];
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
      placesOnMap.map = mapFactory.showMap();
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
      mainGroup.addTo(placesOnMap.map);
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
        groups[input].addTo(placesOnMap.map);
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
        for (var key in types) {
          mainGroup.checkIn(groups[key]);
          groups[key].addTo(placesOnMap.map);
        }
      }

      placesOnMap.map.on('click move', function() {
        placesOnMap.map.closePopup();
      });
    };

    placesOnMap.removePlaces = function(input) {
      if (input) {
        mainGroup.checkOut(groups[input]);
        groups[input].clearLayers();
        placesOnMap.places[input] = [];
      } else {
        for (var key in types) {
          mainGroup.checkOut(groups[key]);
          groups[key].clearLayers();
        }
        for (var key2 in placesOnMap.places) {
          placesOnMap.places[key2] = [];
        }
      }
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
      var coordsArray = [];
      track.places.forEach(function(place, index) {
        var coords = [];
        coords[0] = place.location.coordinates[1];
        coords[1] = place.location.coordinates[0];
        coordsArray[index] = coords;
      });
      trackForAdding = polyline(coordsArray, color).addTo(placesOnMap.map);
      tracks.push([trackForAdding, track.type]);
    };

    var removeTrack = function(track) {
      if (this == 'all') {
        placesOnMap.map.removeLayer(track[0]);
      } else {
        if (track[1] == this) {
          placesOnMap.map.removeLayer(track[0]);
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
    placesOnMap.openAddPlaceMenu = function() {
      placesOnMap.map.on('click', addNewPlaceOnMap);
    };

    placesOnMap.closeAddPlaceMenu = function() {
      placesOnMap.map.off('click', addNewPlaceOnMap);
    };

    function addNewPlaceOnMap(e) {
      var latitudeContainer = angular.element('#latitude');
      var longitudeContainer = angular.element('#longitude');
      placesOnMap.coords = [e.latlng.lng, e.latlng.lat];
      placesOnMap.coordsIsDefined = true;
      if (newMarker) {
        placesOnMap.map.removeLayer(newMarker);
      }
      newMarker = L.marker([placesOnMap.coords[1], placesOnMap.coords[0]]).addTo(placesOnMap.map);
      latitudeContainer.text('Latitude: ' + newMarker._latlng.lat);
      longitudeContainer.text('Longitude: ' + newMarker._latlng.lng);
    }

    placesOnMap.removeNewMarker = function() {
      if (newMarker) {
        placesOnMap.map.removeLayer(newMarker);
      }
    };

    placesOnMap.newTrackPoints = [];

    return placesOnMap;
  }]);
