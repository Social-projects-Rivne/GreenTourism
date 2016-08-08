angular.module('place', [
  'placeModel',
  'placeList',
  'placeDetail',
  'locationPlaces',  // TODO: Move this to places dependencies (or remove)
  'popularPlaces',  // TODO: Move this to places dependencies (or remove)
  'mapModule',
  'searchModel',
  'searchPlace'
]);
