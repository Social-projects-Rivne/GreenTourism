angular.module('greenTourism')
  .factory('constants', function() {
    var constants = {};
    constants.defaultZoom = 14;
    constants.defaultOpacity = 1;
    constants.radiusForPopularItems = 5000;
    constants.radiusForAddingTrackPoints = 2000;
    constants.mapCenter = [50.6234, 26.2189];
    constants.defaultPlaceType1 = "featuredPlace";
    constants.defaultPlaceType2 = "service";
    return constants;
  });
