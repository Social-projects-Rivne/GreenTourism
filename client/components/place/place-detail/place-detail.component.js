angular.module('placeDetail', [])
  .component('placeDetail', {
    templateUrl: 'components/place/place-detail/place-detail.template.html',
    bindings: {
      place: '<'
    },
    controller: function placeDetailCtrl($scope) {
      this.map = L.map('map1', {
        center: [50.6234, 26.2189],
        zoom: 14
      });
      Streets = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      });
      this.map.addLayer(Streets);
      //this.location = this.place.getLocation();
      this.marker = L.marker(L.latLng(this.place.location.coordinates[0], this.place.location.coordinates[1])).addTo(this.map);
      this.marker.bindPopup('<div><h3>' + this.place.name +
        '</h3><a><img class="marker-image" src="assets/' + this.place.photos[0] +
        '" /></a><br />').openPopup();

      this.map.setView([this.place.location.coordinates[0], this.place.location.coordinates[1]]);
      this.closePage = function () {
        $scope.$emit('closePage', 'pageClass');

      }

    }
  });
