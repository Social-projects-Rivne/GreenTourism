angular.module('greenTourism')
  .controller('MainCtrl', ['$rootScope', '$scope', '$location', function MainCtrl($rootScope, $scope, $location) {
    var ctrl = this;

    if ($location.path().split('/').slice(1, 2).join('/') != "places") {
      $scope.pageClass = 'page';
    }
    $scope.$on('closePage', function(event, data) {
      location.href = "#!/places";
    });

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
