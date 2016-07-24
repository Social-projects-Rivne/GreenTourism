function locationplacesCtrl(mapFactory, $scope, placesOnMap, constants, preloadImages) {
  var ctrl = $scope;
  var latitude;
  var longitude;
  ctrl.places = placesOnMap.getPlaceArr();
  $scope.placesByLocation = ctrl.places;
  $scope.placesByLocation=_.sortBy($scope.placesByLocation, ['rate']);
  $scope.placesByLocation.splice(0,$scope.placesByLocation.length-5);
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

    $scope.placesByLocation=placesArr.filter(function(place){
      latitude = place.location.coordinates[0];
      longitude = place.location.coordinates[1];

      return (latitude > min.lat && longitude > min.lng
        && latitude < max.lat && longitude < max.lng) && place.photos[0];
      }
    );
    $scope.placesByLocation=_.sortBy($scope.placesByLocation, ['rate']);
    $scope.placesByLocation.splice(0,$scope.placesByLocation.length-10);


    console.log($scope.placesByLocation);
    $scope.placesByLocation.forEach(function(place) {
      console.log(place.photos[0]);
      preloadImages(place.photos[0]).then(function() {
        //element.css({
        // "background-image": "url('" + attrs.url + "')"
        // });
        //element.fadeIn();
        console.log("LOADED!!!");
        $scope.$apply();
      });
    });
  }

  this.placesFilter = function(value) {
    return value.type == constants.placesOnLoad && value.photos[0];
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
