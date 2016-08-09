function locationplacesCtrl(mapFactory, $scope, placesOnMap, constants, Place, $timeout) {
  var ctrl = this;
  var latitude;
  var longitude;
  Place.getList({sort: '-rate', limit: 10}).then(function(popularPlaces) {
    ctrl.popularPlaces = popularPlaces;
    $scope.placesByLocation = popularPlaces;
    $scope.placesByLocation = _.shuffle($scope.placesByLocation);
    ctrl.markers = placesOnMap.showPlaces($scope.placesByLocation);
  });

  $scope.map = mapFactory.map;
  $scope.map.on('moveend', setLocationPlaces);

  function setLocationPlaces() {
    //$scope.center = $scope.map.getCenter();
    $scope.placesByLocation = [];
    $scope.placesByLocation = placesOnMap.getPlaceArr();

    if ($scope.placesByLocation.length == 0)
      $scope.placesByLocation = ctrl.popularPlaces;

    $timeout(function() {

      $scope.$apply();
    }, 10000);
  }

  this.placesFilter = function(value) {
    return value.type == constants.placesOnLoad && value.photos[0];
  }

  $scope.showMarker = function(lat, lon, place) {
    if (ctrl.marker_new) {
      mapFactory.map.removeLayer(ctrl.marker_new);
    }
    $timeout(function() {
      mapFactory.map.panTo(new L.LatLng(lat, lon), animate = true);
    }, 100);
    var iconmarker = "assets/img/places/marker/search.png";
    var noname = 'http://homyachok.com.ua/images/noimage.png';
    photo = place.photos[0];
    if (!place.photos[0])
      photo = noname;
    ctrl.marker_new = marker(lon, lat, iconmarker)
      .addTo(mapFactory.map)
      .bindPopup('<div class=\'popup  center-block\'><h3>' + place.name + '</h3><a>' +
        '<img class=\'marker-image  center-block\' src=\'' + photo + '\' /></a>' +
        '<br /><br /><button type=\'button\' class=\'btn btn-default btn-md center-block\'> ' +
        '<a href=\'#!/places/' + place._id + '\'>Details >></a> ' +
        '</button></div>', {autoPan: false});
  };

  var marker = function(lon, lat, iconmarker) {
    var newIcon = L.icon({
      iconUrl: iconmarker,
      shadowUrl: 'assets/img/places/marker/marker-shadow.png',
      iconSize: [30, 46],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],

    });
    markerobj = L.marker([lat, lon], newIcon, zIndexOffset = 50);
    markerobj.setIcon(newIcon);
    markerobj.setZIndexOffset(5000);
    markers.push(markerobj);
    return markerobj;

  };

  $scope.$on('placesLocationClose', function(event, data) {
    ctrl.hidePopularPlaces = data;
    if (ctrl.marker_new) {
      if (ctrl.marker_new) {
        mapFactory.map.removeLayer(ctrl.marker_new);
      }
    }
  });

}

angular.module('locationPlaces', []).
component('locationPlaces', {
  bindings: {
    places: '<'
  },
  templateUrl: 'components/place/places-location/locationPlaces.template.html',
  controller: locationplacesCtrl
});