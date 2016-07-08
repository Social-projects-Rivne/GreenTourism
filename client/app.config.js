angular.module('greenTourism')
  .config(['RestangularProvider', function(RestangularProvider) {
    RestangularProvider.setBaseUrl('/api');
  }]);

angular.module('greenTourism')
  .controller('MainCtrl', ['$rootScope', function MainCtrl($rootScope) {
    var ctrl = this;

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
