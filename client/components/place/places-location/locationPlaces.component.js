function locationplacesCtrl(mapFactory, $scope, placesOnMap, constants, Place) {
  var ctrl = $scope;
  var latitude;
  var longitude;
  Place.getList({sort: '-rate', limit: 10}).then(function(popularPlaces) {
    ctrl.popularPlaces = popularPlaces;
    $scope.placesByLocation = popularPlaces;
    $scope.placesByLocation = _.shuffle($scope.placesByLocation);
  });

  $scope.map = mapFactory.map;
  $scope.map.on('moveend', setLocationPlaces);

  function setLocationPlaces() {
    $scope.center = $scope.map.getCenter();
    var bounds = $scope.map.getBounds();
    var min = bounds.getSouthWest().wrap();
    var max = bounds.getNorthEast().wrap();
    $scope.placesByLocation = [];
    ctrl.places = placesOnMap.getPlaceArr();
    var placesArr =  _.sortBy(ctrl.places, ['rate']);

    $scope.placesByLocation = placesArr.filter(function(place) {
        latitude = place.location.coordinates[1];
        longitude = place.location.coordinates[0];
        return (latitude > min.lat && longitude > min.lng
          && latitude < max.lat && longitude < max.lng) && place.photos[0];
      }
    );
    var numberOfPopularPlaces = 5;
    $scope.placesByLocation = $scope.placesByLocation.slice($scope.placesByLocation.length - numberOfPopularPlaces, $scope.placesByLocation.length);
    if ($scope.placesByLocation.length == 0)
      $scope.placesByLocation = ctrl.popularPlaces;

      $scope.$apply();

  }

  this.placesFilter = function(value) {
    return value.type == constants.placesOnLoad && value.photos[0];
  }
}
this.openPage = function() {
  $scope.$emit('openPage', 'pageClass');

}
angular.module('locationPlaces', []).
component('locationPlaces', {
  bindings: {
    places: '<'
  },
  templateUrl: 'components/place/places-location/locationPlaces.template.html',
  controller: locationplacesCtrl
});
