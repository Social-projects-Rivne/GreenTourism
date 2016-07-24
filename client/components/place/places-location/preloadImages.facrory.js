angular.module('locationPlaces')
  .factory('preloadImages', ['$q', function($q) {
    return function(imagesArr) {
      var deffered = $q.defer();
      var counter=0;

      imagesArr.forEach(function(place) {

        image = new Image();

        image.src = place.photos[0];
        if (image.complete) {
          counter++;
          console.log(counter);
          if(counter>=imagesArr.length-1)
          {
           deffered.resolve();
          }

        } else {


          image.addEventListener('error', function() {
            deffered.reject();
          });
        }
      });
      return deffered.promise;
    }
  }]);
