angular.module('greenTourism')
  .factory('constants', function() {
    var constants = {};
    constants.defaultZoom = 14;
    constants.defaultOpacity = 1;
    constants.radiusForPopularItems = 5000;
    constants.radiusForAddingTrackPoints = 2000;
    constants.mapCenter = [50.6234, 26.2189];
    // For Places
    constants.checkedClass = 'glyphicon glyphicon-ok';
    constants.placesOnLoad = 'featured';
    constants.emptyPlaceModel = {
      name: '',
      type: '',
      description: '',
      location: {
        type: 'Point',
        coordinates: []
      },
      photos: [],
      owner: '',
      rate: 0,
      address: ''
    };
    return constants;
  });
