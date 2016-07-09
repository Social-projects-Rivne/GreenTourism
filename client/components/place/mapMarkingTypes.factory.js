angular.module('greenTourism')
  .factory('mapMarkingTypes', function() {  //Renamed factory to mapMarkingTypes
    var mapMarkingTypes = {};
    mapMarkingTypes.placesType = [
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

    mapMarkingTypes.tracksType = [
      {
        type: 'bicycle',
        name: 'Bicycle',
        color: '#2f2fd0'
      },
      {
        type: 'car',
        name: 'Car',
        color: '#ff0a47'
      },
      {
        type: 'walking',
        name: 'Walking',
        color: '#f9ff0b'
      },
      {
        type: 'mixed',
        name: 'Mixed',
        color: '#0aff0a'
      }
    ];
    return mapMarkingTypes;
  });