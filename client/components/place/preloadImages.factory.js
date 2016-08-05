angular.module('placeDetail')
  .factory('preloadImages', ['$q', function($q) {
    return function(imagesArr) {
      var deffered = $q.defer();
      var counter = 0;

      imagesArr.forEach(function(imagesrc) {
        image = new Image();
        image.src = imagesrc;
        if (image.complete) {
          counter++;
          if (counter >= imagesArr.length - 1) {
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
