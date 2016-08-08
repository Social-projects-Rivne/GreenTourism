angular.module('greenTourism')
  .controller('MainCtrl', ['$rootScope', '$location', '$window',
    function MainCtrl($rootScope, $location, $window) {
      var ctrl = this;

      // TODO: Add flash messages hiding when changing route

      $rootScope.$on('$routeChangeSuccess',
        function(event, current, previous) {
          $window.scrollTo(0, 0);

          var placeDetailRoute = /^\/places\/\.*/;
          var placeRoute = /^\/places/;

          var isPlaceDetailCurrentRoute = placeDetailRoute.test(
            current.$$route.originalPath);
          var isPlacePreviousRoute = previous &&
            placeRoute.test(previous.$$route.originalPath);

          // Check if current route matching place detail page
          if (isPlaceDetailCurrentRoute && isPlacePreviousRoute) {
            ctrl.placeDetailPage = true;
          } else {
            ctrl.placeDetailPage = false;
          }

          ctrl.routeChangeError = false;
          ctrl.statusCode = 200;
        }
      );

      $rootScope.$on('$routeChangeError',
        function(event, current, previous, rejection) {
          ctrl.routeChangeError = true;
          ctrl.statusCode = rejection.status;
        }
      );
    }
]);
