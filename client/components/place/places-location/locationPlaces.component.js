function locationplacesCtrl(mapFactory, $scope, placesOnMap, constants) {
  var ctrl = $scope;
  var latitude;
  var longitude;
  ctrl.places = placesOnMap.getPlaceArr();
  $scope.placesByLocation = ctrl.places;
  console.log(ctrl.places);
  $scope.map = mapFactory.map;
  $scope.map.on('moveend', setLocationPlaces);

  function setLocationPlaces() {
    $scope.center = $scope.map.getCenter();
    var bounds = $scope.map.getBounds();
    var min = bounds.getSouthWest().wrap();
    var max = bounds.getNorthEast().wrap();
    $scope.placesByLocation = [];
    ctrl.places = placesOnMap.getPlaceArr();
    var placesArr = ctrl.places;
    placesArr.forEach(function(place) {
      latitude = place.location.coordinates[0];
      longitude = place.location.coordinates[1];
      if (latitude > min.lat && longitude > min.lng
        && latitude < max.lat && longitude < max.lng) {
        $scope.placesByLocation.push(place);
        $scope.$apply();
      }
    });
  }

  this.placesFilter = function(value) {
    return value.type == constants.defaultPlaceType1 || value.type == constants.defaultPlaceType2;
  }
}

angular.module('locationPlaces', []).
component('locationPlaces', {
  bindings: {
    places: '<'
  },
  templateUrl: 'components/place/places-location/locationPlaces.template.html',
  controller: locationplacesCtrl
});
