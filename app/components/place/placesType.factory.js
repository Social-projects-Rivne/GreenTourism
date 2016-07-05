angular.module('greenTourism')
  .factory('placesType', function() {
    var placesType = [
      {
        "type": "camp",
        "name": "Camp",
        "icon": "assets/img/places/marker/blue.png"
      },
      {
        "type": "service",
        "name": "Service",
        "icon": "assets/img/places/marker/green.png"
      },
      {
        "type": "hostes",
        "name": "Hostes",
        "icon": "assets/img/places/marker/red.png"
      },
      {
        "type": "featuredPlace",
        "name": "Featured Place",
        "icon": "assets/img/places/marker/yellow.png"
      },
      {
        "type": "healthcare",
        "name": "Healthcare",
        "icon": "assets/img/places/marker/violet.png"
      }
    ];
    return placesType;
  });
