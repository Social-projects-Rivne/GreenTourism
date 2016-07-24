angular.module('greenTourism')
  .controller('MainCtrl', ['$rootScope', '$scope', function MainCtrl($rootScope, $scope) {
    var ctrl = this;
    $scope.pageClass = 'page-detail';
    $scope.$on('closePage', function(event, data) {
      if (data == 'pageClass') {
        $scope.pageClass = 'page-detail ng-leave';
        location.href = "#!/places";
        $scope.pageClass = 'page-detail ng-enter';
      }
    });
    // TODO: Add flash messages hiding when changing route

    $rootScope.$on('$routeChangeSuccess', '$scope', function(event, current, previous, $scope) {
      ctrl.routeChangeError = false;
      ctrl.statusCode = 200;


    });

    $rootScope.$on('$routeChangeError', function(event, current, previous,
                                                 rejection) {
      ctrl.routeChangeError = true;
      ctrl.statusCode = rejection.status;
    });
  }]);
