angular.module('greenTourism')
  .factory('mapMarkingTypes', function() {
    var types = {};
    types.places = {
      camp: {
        name: 'Camp',
        icon: 'assets/img/places/marker/blue.png'
      },
      service: {
        name: 'Service',
        icon: 'assets/img/places/marker/green.png'
      },
      hostes: {
        name: 'Hostes',
        icon: 'assets/img/places/marker/red.png'
      },
      featured: {
        name: 'Featured Place',
        icon: 'assets/img/places/marker/yellow.png'
      },
      healthcare: {
        name: 'Healthcare',
        icon: 'assets/img/places/marker/violet.png'
      }
    };

    types.tracks = {
      bicycle: {
        name: 'Bicycle',
        color: '#2f2fd0'
      },
      car: {
        name: 'Car',
        color: '#ff0a47'
      },
      walking: {
        name: 'Walking',
        color: '#f9ff0b'
      },
      mixed: {
        name: 'Mixed',
        color: '#0aff0a'
      }
    };

    types.events = {
      game: {
        name: 'Game',
        icon: 'assets/img/events/marker/green.png'
      },
      festival: {
        name: 'Festival',
        icon: 'assets/img/events/marker/red.png'
      },
      meeting: {
        name: 'Meeting',
        icon: 'assets/img/events/marker/blue.png'
      }
    };

    types.layers = {
      streets: {
        name: 'Streets',
        link: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        attribute: '&copy; <a href="http://osm.org/copyright">' +
        'OpenStreetMap</a> contributors'
      },
      outdoors: {
        name: 'Outdoors',
        link: 'http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png',
        attribute: '&copy; <a href="http://www.thunderforest.com/">' +
        'Thunderforest</a>, &copy; ' +
        '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      },
      satellite: {
        name: 'Satellite',
        link: 'http://server.arcgisonline.com/ArcGIS/rest/services/' +
        'World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribute: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, ' +
        'USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, ' +
        'and the GIS User Community'
      }
    };
    return types;
  });