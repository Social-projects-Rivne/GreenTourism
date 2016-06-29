function locationplacesCtrl(placeModel) {
  var ctrl = this;
  ctrl.places = placeModel.getPlaceList.query();


  this.placesFilter = function(value) {
    return value.type == "Service" && value.rate;
  }
}

angular.module('locationPlaces', []).
component('locationPlaces', {
  templateUrl: 'components/place/places-location/locationPlaces.template.html',
  controller: locationplacesCtrl
});
