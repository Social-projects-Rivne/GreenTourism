angular.module('greenTourism')
  .controller('NavCtrl', ['$location', function NavCtrl($location) {
    var ctrl = this;

    ctrl.isActive = function(viewLocation) {
          var currentLocation = $location.path().split('/').slice(0, 2).join('/');
          var currentLocationParameter = $location.path().split('/').slice(2, 3).join('/');
          return viewLocation === currentLocation;
      };
      ctrl.isShowFooter= function(viewLocation) {
          var currentLocation = $location.path().split('/').slice(0, 2).join('/');
          var currentLocationParameter = $location.path().split('/').slice(2, 3).join('/');
          return (viewLocation === currentLocation&&currentLocationParameter);
      };
  }]);
