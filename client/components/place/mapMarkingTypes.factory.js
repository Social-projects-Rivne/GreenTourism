angular.module('greenTourism')
  .factory('mapMarkingTypes', function() {
    var types = {};
    types.placesType = [
      {
        type: 'camp',
        name: 'Camp',
        icon: 'assets/img/places/marker/blue.png'
      },
      {
        type: 'service',
        name: 'Service',
        icon: 'assets/img/places/marker/green.png'
      },
      {
        type: 'hostes',
        name: 'Hostes',
        icon: 'assets/img/places/marker/red.png'
      },
      {
        type: 'featuredPlace',
        name: 'Featured Place',
        icon: 'assets/img/places/marker/yellow.png'
      },
      {
        type: 'healthcare',
        name: 'Healthcare',
        icon: 'assets/img/places/marker/violet.png'
      }
    ];

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
    return types;
  });
