function locationplacesCtrl(mapFactory, $scope, Restangular) {
  var ctrl = $scope;
  ctrl.places = this.places;
  $scope.map = mapFactory.map;
  $scope.placesByLocation = ctrl.places;
  $scope.map.on('moveend', setLocationPlaces);
  function setLocationPlaces() {
    $scope.center = $scope.map.getCenter();
    var bounds = $scope.map.getBounds();
    var min = bounds.getSouthWest().wrap();
    var max = bounds.getNorthEast().wrap();
    $scope.placesByLocation = [];
    var placesArr = ctrl.places;
    placesArr.forEach(function (place, i, placesArr) {
      if (placesArr[i].latitude > min.lat && placesArr[i].longitude > min.lng
        && placesArr[i].latitude < max.lat && placesArr[i].longitude < max.lng) {
        $scope.placesByLocation.push(ctrl.places[i]);
        $scope.$apply();
      }
    });

  }

  this.placesFilter = function (value) {
    return value.type == "featuredPlace" || value.type == "service";
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
