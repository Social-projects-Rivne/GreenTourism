angular.module('greenTourism')
  .controller('NavController', ['$location', function NavController($location) {
    this.isActive = function(viewLocation) {
      var currentLocation = $location.path().split('/').slice(0, 2).join('/');

      return viewLocation === currentLocation;
    };
  }]);
