angular.module('placeModel', ['restangular'])
  .factory('Place', ['Restangular', function Place(Restangular) {
    var Place = Restangular.service('places');

    // Custom methods goes here
    Restangular.extendModel('places', function(model) {
      model.getLocation = function() {
        return L.latLng(this.latitude, this.longitude);
      };

      return model;
    });

    return Place;
  }]);
