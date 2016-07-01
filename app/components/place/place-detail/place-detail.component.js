angular.module('placeDetail', [])
  .component('placeDetail', {
    templateUrl: 'components/place/place-detail/place-detail.template.html',
    bindings: {
      place: '<'
    },
    controller: function placeDetailCtrl($route) {
      // If no promise - this place is {} - use $.isEmptyObject(this.place);
      // If promise - this place is 'undefined'
      if (this.place) {
        console.log('Place was successfully loaded!');
      } else {
        console.log('Place failed to load!');
      }
    }
  });
