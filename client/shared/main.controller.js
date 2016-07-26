angular.module('greenTourism')
  .controller('MainCtrl', ['$rootScope', function MainCtrl($rootScope) {
    var ctrl = this;

    // TODO: Add flash messages hiding when changing route

    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
      ctrl.routeChangeError = false;
      ctrl.statusCode = 200;
    });

    $rootScope.$on('$routeChangeError', function(event, current, previous,
                                                 rejection) {
      ctrl.routeChangeError = true;
      ctrl.statusCode = rejection.status;
    });
  }]);
