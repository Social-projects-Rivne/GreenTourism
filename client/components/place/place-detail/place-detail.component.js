angular.module('placeDetail', ['comment'])
  .component('placeDetail', {
    templateUrl: 'components/place/place-detail/place-detail.template.html',
    bindings: {
      place: '<'
    },
    controller: function placeDetailCtrl($scope, constants) {
      angular.element(document).ready (function() {
        $('.fancybox').fancybox();
      });
      this.map = L.map('map1', {
        center: constants.mapCenter,
        zoom: constants.defaultZoom
      });
      var layerStreet = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      });
      this.map.addLayer(layerStreet);
      this.marker = L.marker(L.latLng(this.place.location.coordinates[1], this.place.location.coordinates[0])).addTo(this.map);
      this.marker.bindPopup('<div class="popup"><h3>' + this.place.name +
        '</h3><a><img class="marker-image center-block" src="' + this.place.photos[0] + '" /></a><br />').openPopup();
      var deltaheight = 0.003;
      this.map.setView([this.place.location.coordinates[1] + deltaheight, this.place.location.coordinates[0]]); //0.005- for responcive design- show info on mobile
    }
  });
