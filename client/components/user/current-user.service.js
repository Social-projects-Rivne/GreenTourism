angular.module('user').factory('currentUser', ['$window',
  function($window) {
    var user = $window.user;
    delete $window.user;

    return user;
  }
]);
