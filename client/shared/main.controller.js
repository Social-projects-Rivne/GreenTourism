angular.module('greenTourism')
  .controller('MainCtrl', ['$rootScope', '$location',
    function MainCtrl($rootScope, $location) {
      var ctrl = this;

      // TODO: Add flash messages hiding when changing route

      $rootScope.$on('$routeChangeSuccess',
        function(event, current, previous) {
          var placeDetailRoute = /^\/places\/\.*/;

          var isPlaceDetailCurrentRoute = placeDetailRoute.test(
            current.$$route.originalPath);
          var isPlaceDetailPreviousRoute = previous &&
            placeDetailRoute.test(previous.$$route.originalPath);

          // Check if current or previous route matching place detail page
          if (isPlaceDetailCurrentRoute || isPlaceDetailPreviousRoute) {
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
