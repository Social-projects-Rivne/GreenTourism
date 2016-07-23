
popularplacesCtrl.$inject = ['placeModel']; function popularplacesCtrl(placeModel) {
  var ctrl = this;
  ctrl.places = placeModel.getPlaceList.query();

  this.placesFilter = function(value) {
    return value.type == 'Service' && value.rate;
  };
}

angular.module('popularPlaces', []).
component('popularPlaces', {
  templateUrl: 'components/place/popular-places/popularPlaces.template.html',
  controller: popularplacesCtrl
});
