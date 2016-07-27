angular.module('welcomePage', [])
  .component('welcomePage', {
    templateUrl: 'components/welcome-page/welcome-page.template.html',
    controller: ['Place', 'Restangular', function(Place, Restangular) {
      var ctrl = this;
      var random;
      var existRandom;
      var counter = 0;
      var MAX_POPULAR_PLACES = 2;
      ctrl.popularPlaces = [];

      Place.getList({sort: '-rate', limit: 10}).then(function(result) {
        while (counter < MAX_POPULAR_PLACES) {
          random = Math.floor(Math.random() * result.length);
          if (existRandom !== random) {
            ctrl.popularPlaces.push(result[random]);
            counter++;
          }
          existRandom = random;
        }
      }).then(function() {
        // TODO: Refactoring after implement add address when place adding
        Restangular.oneUrl('location',
          'https://nominatim.openstreetmap.org/reverse?format=json&lat=' +
          ctrl.popularPlaces[0].location.coordinates[1] +
          '&lon=' + ctrl.popularPlaces[0].location.coordinates[0] +
          '&addressdetails=0&zoom=10').get().then(function(result) {
          ctrl.popularPlaces[0].address = result.display_name;
        });
        Restangular.oneUrl('location',
          'https://nominatim.openstreetmap.org/reverse?format=json&lat=' +
          ctrl.popularPlaces[1].location.coordinates[1] +
          '&lon=' + ctrl.popularPlaces[1].location.coordinates[0] +
          '&addressdetails=0&zoom=10').get().then(function(result) {
          ctrl.popularPlaces[1].address = result.display_name;
        });
      });

      // Animation on click arrow
      var page = angular.element('html, body');
      var video = angular.element('.parallax');
      angular.element('a[href="#welcome-page-content"]').click(function() {
        var heightScroll = video.outerHeight();
        page.animate({
          scrollTop: heightScroll
        }, 1000);
        return false;
      });
    }
    ]
  });
