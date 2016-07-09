
function locationplacesCtrl(mapFactory, $scope) {
  var ctrl = $scope;
  ctrl.places=this.places;
  $scope.placesByLocation=ctrl.places;
  $scope.map = mapFactory.map;
  $scope.map.on('moveend', setLocationPlaces);
  function setLocationPlaces(){
    $scope.center=$scope.map.getCenter();
    var bounds = $scope.map.getBounds();
    var min = bounds.getSouthWest().wrap();
    var max = bounds.getNorthEast().wrap();
    $scope.placesByLocation=[];
    for (i = 0; i < ctrl.places.length; i++) {
      if(ctrl.places[i].latitude>min.lat&&ctrl.places[i].longitude>min.lng&&ctrl.places[i].latitude<max.lat&&ctrl.places[i].longitude<max.lng){
        $scope.placesByLocation.push(ctrl.places[i]);
        $scope.$apply();
      }

    }
  }
  this.placesFilter=function(value)
  {
    return value.type=="featuredPlace"||value.type=="service";
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
