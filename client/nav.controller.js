angular.module('greenTourism')
  .controller('NavCtrl', ['$location', function NavCtrl($location) {
    var ctrl = this;

    ctrl.isActive = function(viewLocation) {
      var currentLocation = $location.path().split('/').slice(0, 2).join('/');
      return viewLocation === currentLocation;
    };
  }]);
