angular.module('mapModule')
  .factory('placesOnMap', ['mapFactory', 'mapMarkingTypes', function(mapFactory, mapMarkingTypes) {
    var placesOnMap = {};
    var mainGroup = L.markerClusterGroup
      .layerSupport({showCoverageOnHover: false, maxClusterRadius: 40});
    var groups = [];
    var types = [];
    var places = [];
    var groupeE = [];
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
    var boldLine;
    var polyline = function(trackPoints, color) {
      return L.polyline(trackPoints, {
        color: (color ? color : '#000'),
        opacity: 1
      });
    };

    function overPolyline() {
      map.removeLayer(this);
      boldLine = L.polyline(this._latlngs, {
        color: '#000',
        opacity: 0.8,
        weight: 8
      }).addTo(map);
      this.addTo(map);
    };

    function leavePolyline() {
      map.removeLayer(boldLine);
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
        trackForAdding.on('mouseover', overPolyline); 
        trackForAdding.on('mouseout', leavePolyline); 
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

    placesOnMap.initGroupsOfEvents = function(inpTypes) {
        var type = inpTypes;
        for (var key in type) {
          if ({}.hasOwnProperty.call(type, key)) {
            groupeE[key] = L.layerGroup();
          }
        }
      };

      /* Events */
      placesOnMap.openAddEventMenu = function() {
          map.on('click', addNewEventOnMap);
      };

      placesOnMap.closeAddEventMenu = function() {
          map.off('click', addNewEventOnMap);
      };

    placesOnMap.showEvents = function(events, input) {
      var pix = mapMarkingTypes.events[input].icon;
        console.log('events:'); console.log(events);
      events.forEach(function(event) {
        console.log(event.location.coordinates[1]+' - '+ event.location.coordinates[0] + ' ' + pix+ ' event.photos[0]=' +event.photos[0]);

        marker(event.location.coordinates[0], event.location.coordinates[1], pix)
        .addTo(groupeE[input])
        .bindPopup('<div class=\'popup  center-block\'><h3>' + event.name + '</h3><a><img class=\'marker-image\' src="' + event.photos[0] + '"></a>' +
                '<br /><br /><button type=\'button\' class=\'btn btn-default btn-md center-block\'> <a href=\'#!/events/' + event._id + '\'>Details >></a> </button></div>', {autoPan: false});

       }) ;

       console.log('On map: ') ;
       console.log(groupeE[input]) ;
      groupeE[input].addTo(map);
     } ;

      placesOnMap.removeEvents = function(input) {
        if (input) {
          console.log('Del from map: ') ;
          console.log(groupeE) ;
          //mainGroup.checkOut(groups[input]);
          groupeE[input].clearLayers();
          //map.removeLayer(newMarker);
        } else {
          for (var key in types) {
           // mainGroup.checkOut(groups[key]);
           groupeE[input].clearLayers();
          }
        }
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
      var newEventMarker;
      function addNewEventOnMap(e) {
          var latitudeContainer = angular.element('#latitudeE');
          var longitudeContainer = angular.element('#longitudeE');
          placesOnMap.coords = [e.latlng.lng, e.latlng.lat];
          console.log(e.latlng.lng + ' = ' + e.latlng.lat + " -> " + placesOnMap.coords ) ;
          placesOnMap.coordsIsDefined = true;
          if (newEventMarker) {
              map.removeLayer(newEventMarker);
          }
          newEventMarker = L.marker([placesOnMap.coords[1], placesOnMap.coords[0]]).addTo(map);
          latitudeContainer.text('Latitude: ' + newEventMarker._latlng.lat);
          longitudeContainer.text('Longitude: ' + newEventMarker._latlng.lng);
      }

      placesOnMap.removeNewEventMarker = function() {
          if (newEventMarker) {
              map.removeLayer(newEventMarker);
          }
      };

    return placesOnMap;
  }]);
