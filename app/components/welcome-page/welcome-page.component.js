angular.module('welcomePage', [])
  .component('welcomePage', {
    templateUrl: 'components/welcome-page/welcome-page.template.html',
    controller: function (Place) {
      var places = [];
      var placeObject = {};
      var arrPlaces = [];
      Place.getList({_id: '577814343d5b352b9b000b59'}).then(function(result) {
        places = result;

        for (var i = 0; i < places.length; i++) {
          placeObject = {_id: places[i]._id, latitude: places[i].latitude,
            longitude: places[i].longitude, type: places[i].type, rate: places[i].rate};

          arrPlaces.push(placeObject);
        }
  console.log(arrPlaces);
      });

      // Animation on click arrow
      var page = angular.element('html, body');
      angular.element('a[href="#main-page-content"]').click(function () {
        var heightScroll = page.outerHeight();
        page.animate({
          scrollTop: heightScroll
        }, 1000);
        return false;
      });
    }
  });
