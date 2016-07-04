angular.module('greenTourism')
  .factory('User', ['Restangular', function User(Restangular) {
    var User = Restangular.service('users');

    // Custom methods goes here
    Restangular.extendModel('places', function(model) {
      model.getFullName = function() {
        return this.firstName + ' ' + this.lastName;
      };

      return model;
    });

    return User;
  }]);
