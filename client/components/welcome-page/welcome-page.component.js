angular.module('welcomePage', ['ngAnimate'])
  .component('welcomePage', {
    templateUrl: 'components/welcome-page/welcome-page.template.html',
    controller: ['Place', 'Restangular', '$interval',
      function(Place, Restangular, $interval) {
        var ctrl = this;
        var countPopularPlaces = 10;
        var countForShow = 2;
        var i = 0;
        var j = 0;
        ctrl.popularPlaces = [];

        Place.getList({sort: '-rate', limit: countPopularPlaces})
          .then(function(result) {
            for (i = 0; i < countForShow; i++)
              ctrl.popularPlaces.push(result[i]);

            angular.element('.popular-places-images').hover(function() {
              $interval.cancel(timer);
            }, function() {
              timer = $interval(slider, 10000);
            });

            var slider = function() {
              ctrl.popularPlaces = [];
              if (j === countPopularPlaces) j = 0;
              for (i = j; i < countForShow + j; i++)
                ctrl.popularPlaces.push(result[i]);
              j += countForShow;
            };

            ctrl.slideNext = function(input) {
              ctrl.popularPlaces = [];
              if (input) j += countForShow;
              else j -= countForShow;
              if (j >= countPopularPlaces) j = 0;
              if (j < 0) j = countPopularPlaces - countForShow;
              for (i = j; i < countForShow + j; i++)
                ctrl.popularPlaces.push(result[i]);
            };

            var timer = $interval(slider, 10000);
          });

        // Animation on click arrow
        var page = angular.element('html, body');
        angular.element('a[href="#welcome-page-content"]').click(function() {
          var heightScroll = page.outerHeight();
          page.animate({
            scrollTop: heightScroll
          }, 1000);
          return false;
        });
      }
    ]
  });
