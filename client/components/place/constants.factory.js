angular.module('greenTourism')
  .factory('constants', function() {
    var constants = {};
    constants.defaultZoom = 14;
    constants.defaultOpacity = 1;
    constants.radiusForPopularItems = 5000;
    constants.radiusForAddingTrackPoints = 2000;
    constants.mapCenter = [50.6234, 26.2189];
    // For Places and Tracks
    constants.checkedSpanClass = 'glyphicon glyphicon-ok';
    constants.checkedClass = 'checked';
    constants.placesOnLoad = 'featured';
    constants.checkDisabled = 'check-disabled';
    constants.spinner = 'glyphicon glyphicon-refresh';
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
    constants.emptyTrackModel = {
      name: '',
      type: '',
      description: '',
      location: {
        type: 'LineString',
        coordinates: [],
      },
      places: [],
      photos: [],
      owner: ''
    };

    return constants;
  });
