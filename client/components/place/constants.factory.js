angular.module('greenTourism')
  .factory('constants', function() {
    var constants = {};
    constants.defaultZoom = 14;
    constants.defaultOpacity = 1;
    constants.radiusForPopularItems = 50000;
    constants.radiusForAddingTrackPoints = 2000;
    constants.mapCenter = [50.6234, 26.2189];
    // For Places and Tracks
    constants.checkedSpanClass = 'glyphicon glyphicon-ok';
    constants.checkedClass = 'checked';
    constants.placesOnLoad = 'featured';
    constants.checkDisabled = 'check-disabled';
    constants.spinner = 'glyphicon glyphicon-refresh';
    constants.date = new Date();
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
      rate: 0,
      owner: ''
    };
      constants.emptyEventModel = {
          name: '',
          description: '',
          photos: [],
          type: '',
          owner: '',
          dateStart: 0,
          dateEnd: 0,
          location: {
              type: 'Point',
              coordinates: []
          },
          price: 0,
          track: 0,
          rate: 0,
       };
    return constants;
  });
