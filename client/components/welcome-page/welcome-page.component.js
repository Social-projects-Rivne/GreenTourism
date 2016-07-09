angular.module('welcomePage', [])
  .component('welcomePage', {
    templateUrl: 'components/welcome-page/welcome-page.template.html',
    controller: function (Place, Restangular) {
      var self = this;
      var random;
      var existRandom;
      var obj = {};
      var i = 0;
      self.outputPopularPlaces = [];

      Place.getList({sort: '-rate', limit: 10}).then(function(result) {
        self.popularPlaces = result;

        while (i < 2) {
          random = Math.floor(Math.random() * self.popularPlaces.length);
          if (existRandom != random) {
            obj = {
              _id: self.popularPlaces[random]._id,
              name: self.popularPlaces[random].name,
              latitude: self.popularPlaces[random].latitude,
              longitude: self.popularPlaces[random].longitude,
              photo: self.popularPlaces[random].photo[0],
              location: ''
            };

            self.outputPopularPlaces.push(obj);
            i++;
          }
          existRandom = random;
        }
      }).then(function() {
          Restangular.oneUrl('location', 'http://nominatim.openstreetmap.org/reverse?format=json&lat=' + self.outputPopularPlaces[0].latitude +
            '&lon=' + self.outputPopularPlaces[0].longitude + '&addressdetails=0').get().then(function (result) {
            self.outputPopularPlaces[0].location = result.display_name;
          });
        Restangular.oneUrl('location', 'http://nominatim.openstreetmap.org/reverse?format=json&lat=' + self.outputPopularPlaces[1].latitude +
          '&lon=' + self.outputPopularPlaces[1].longitude + '&addressdetails=0').get().then(function(result) {
          self.outputPopularPlaces[1].location = result.display_name;
        });
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
