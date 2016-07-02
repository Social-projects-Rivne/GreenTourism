/*angular.module('greenTourism')
  .config(function($lcationProvider, $routeProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $routeProvider.caseInsensitiveMatch = true;
  });
*/

angular.module('greenTourism').config(function($resourceProvider) {
  $resourceProvider.defaults.actions.update = {
    method: 'PUT'
  };
});

angular.module('greenTourism')
  .controller('MainCtrl', function MainCtrl($rootScope) {
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
  });
