angular.module('auth').factory('Authentication', ['$window',
  function($window) {
    this.user = $window.user;

    return {
      user: this.user
    };
  }
]);
