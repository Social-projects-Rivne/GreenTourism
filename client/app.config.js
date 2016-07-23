angular.module('greenTourism')
  .config(['RestangularProvider', function(RestangularProvider) {
    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setRestangularFields({
      id: '_id'
    });
  }]);

angular.module('greenTourism')
  .controller('MainCtrl', ['$rootScope', '$scope', function MainCtrl($rootScope, $scope) {
    var ctrl = this;
    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
      ctrl.routeChangeError = false;
      ctrl.statusCode = 200;
      $scope.pageClass = 'page page-detail';
      $scope.$on('closePage', function(event, data) {
        $scope.pageClass = 'page page-detail ng-leave';
        location.href = "#!/places";
      });
    });

    $rootScope.$on('$routeChangeError', function(event, current, previous,
                                                 rejection) {
      ctrl.routeChangeError = true;
      ctrl.statusCode = rejection.status;
    });
  }]);
