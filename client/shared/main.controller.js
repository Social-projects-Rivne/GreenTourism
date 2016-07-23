angular.module('greenTourism')
  .controller('MainCtrl', ['$rootScope', function MainCtrl($rootScope) {
    var ctrl = this;

    // TODO: Add flash messages hiding when changing route

    $rootScope.$on('$routeChangeSuccess', '$scope', function(event, current, previous, $scope) {
      ctrl.routeChangeError = false;
      ctrl.statusCode = 200;
      $scope.pageClass = 'page-detail';
      $scope.$on('closePage', function(event, data) {
        $scope.pageClass = 'page-detail ng-leave';
        location.href = "#!/places";
      });
    });

    $rootScope.$on('$routeChangeError', function(event, current, previous,
                                                 rejection) {
      ctrl.routeChangeError = true;
      ctrl.statusCode = rejection.status;
    });
  }]);
