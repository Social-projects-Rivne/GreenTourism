angular.module('place', [
  'placeModel',
  'placeList',
  'placeDetail',
  'placeModal',  // TODO: Move this to placeList
  'locationPlaces',  // TODO: Move this to places dependencies (or remove)
  'popularPlaces',  // TODO: Move this to places dependencies (or remove)
  'mapModule'
]);
