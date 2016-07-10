angular.module('user').factory('currentUser', ['$window',
  function($window) {
    return $window.user;
  }
]);
