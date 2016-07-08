angular.module('welcomePage', [])
  .component('welcomePage', {
    templateUrl: 'components/welcome-page/welcome-page.template.html',
    controller: function (Place) {
      var self = this;
      var random;
      var existRandom;
      var i = 0;
      self.outputPopularPlaces = [];

      Place.getList({sort: '-rate', limit: 10}).then(function(result) {
        self.popularPlaces = result;

        while (i < 2) {
          random = Math.floor(Math.random() * self.popularPlaces.length);
          if (existRandom != random) {
            self.outputPopularPlaces.push(self.popularPlaces[random]);
            i++;
          }
          existRandom = random;
        }
      });

      // Animation on click arrow
      var page = angular.element('html, body');
      angular.element('a[href="#welcome-page-content"]').click(function () {
        var heightScroll = page.outerHeight();
        page.animate({
          scrollTop: heightScroll
        }, 1000);
        return false;
      });
    }
  });
