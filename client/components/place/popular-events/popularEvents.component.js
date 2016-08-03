
popularEventsCtrl.$inject = ['placeModel']; function popularEventsCtrl(placeModel) {
  var ctrl = this;
  ctrl.places = placeModel.getEventList.query();

  this.eventsFilter = function(value) {
    return value.type == 'Service' && value.rate;
  };
}

angular.module('popularEvents', []).
component('popularEvents', {
  templateUrl: 'components/place/popular-events/popularEvents.template.html',
  controller: popularEventsCtrl
});
