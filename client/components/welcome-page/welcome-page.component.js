angular.module('welcomePage', [])
  .component('welcomePage', {
    templateUrl: 'components/welcome-page/welcome-page.template.html',
    controller: function(Place) {
      var self = this;

      Place.getList({sort: 'rate', skip: 18}).then(function(result) {
        self.popularPlaces = result;
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

  });
