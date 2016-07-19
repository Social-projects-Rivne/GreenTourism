angular.module('welcomePage', [])
  .component('welcomePage', {
    templateUrl: 'components/welcome-page/welcome-page.template.html',
    controller: ['Place', 'Restangular', function (Place, Restangular) {
      var self = this;
      var random;
      var existRandom;
      var obj = {};
      var i = 0;
      self.outputPopularPlaces = [];
      var numberOfPopularPlaces = 2;
      var idPopularPlace = 0;
      Place.getList({sort: '-rate', limit: 10}).then(function (result) {
        self.popularPlaces = result;
        console.log(self.popularPlaces);
        while (i < numberOfPopularPlaces) {
          random = Math.floor(Math.random() * self.popularPlaces.length);
          if (existRandom != random) {
            obj = {
              _id: self.popularPlaces[random]._id,
              name: self.popularPlaces[random].name,
              latitude: self.popularPlaces[random].location.coordinates[0],
              longitude: self.popularPlaces[random].location.coordinates[1],
              photo: self.popularPlaces[random].photos[0],
              location: ''
            };

            self.outputPopularPlaces.push(obj);
            i++;
          }
          existRandom = random;
        }
      }).then(
        function (result) {
          getLocation(idPopularPlace, numberOfPopularPlaces);

        });
      function getLocation(idPopularPlace, numberOfPopularPlaces) {
        if (idPopularPlace < numberOfPopularPlaces) {
          Restangular.oneUrl('location', 'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + self.outputPopularPlaces[idPopularPlace].latitude +
            '&lon=' + self.outputPopularPlaces[idPopularPlace].longitude + '&addressdetails=0&zoom=10').get().then(function (result) {
            self.outputPopularPlaces[idPopularPlace].location = result.display_name;
            console.log(result.display_name);
            idPopularPlace++;
            getLocation(idPopularPlace, numberOfPopularPlaces);
          })

        }

      }

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
    ]
  });
