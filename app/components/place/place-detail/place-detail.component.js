angular.module('placeDetail', [])
  .component('placeDetail', {
    templateUrl: 'components/place/place-detail/place-detail.template.html',
    bindings: {
      place: '<'
    },
    controller: function placeDetailCtrl($route, mapFactory) {
      this.map = mapFactory.showMap();
      this.location = this.place.getLocation();
      this.marker = L.marker(this.location).addTo(this.map);

      this.marker.bindPopup('<div><h3>' + this.place.name +
      '</h3><a><img class="marker-image" src="' + 'assets/img/places' +
      this.place.photo[0] + '" \/></a><br />').openPopup();

      this.map.setView(this.location);
    }
  });
