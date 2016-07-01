angular.module('greenTourism')
  .factory('User', function($resource) {
    var User = $resource('/api/users/:id');

    User.prototype.getFullName = function() {
      return this.firstName + ' ' + this.lastName;
    };

    return User;
  });
