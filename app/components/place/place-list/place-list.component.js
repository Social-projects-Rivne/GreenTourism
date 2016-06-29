'use strict';

angular.module('placeList', ['filterCategory', 'filterMapType', 'showMap', 'ngResource', 'ui.bootstrap'])
  .component('placeList', {
    templateUrl: 'components/place/place-list/place-list.template.html',
    controller: ParentController
  });

function ParentController(placeModel, placesOnMap, $scope, $compile) {

  var arrPlaces = [];
  var pointsTypeForShowOnLoad = 'Featured_Place';
  self.types = placeModel.getPlaceTypes.query();
  self.points = placeModel.getPlaceList.query();
  self.points.$promise.then(function(result) {
    self.points = result;

    placesOnMap.initGroupsOfPlaces(self.types);
    placesOnMap.showPoints(pointsTypeForShowOnLoad, self.types, self.points, true);
    placesOnMap.showPlacesOnLoad(arrPlaces, pointsTypeForShowOnLoad);
    var placearr = placeModel.placesArray;
    for (var j = 0; j < placearr.length; j++) {
      setMarker(placearr[j]);
    }
  });

  //placesOnMap.removeAllPlaces();
  function setMarker(point) {
    var URL = "assets/";
    var placeid = point.id;
    var title = point.name;
    var image = point.photo;
    var marker = point.marker;
    var L = point.l;
    var myPopup = L.DomUtil.create('div', 'marker-link' + placeid);
    marker.bindPopup(myPopup);
    marker.on('mouseover', function(e) {
      var linkFn = $compile("<div><h3>" + title + "</h3><a><img class='marker-image' src='" + URL + image + "' \/></a><br /><marker  placeid='" + placeid + "' id='info-marker" + placeid + "'></marker></div>")($scope);
      var element = linkFn;
      this._popup.setContent(element[0]);
      this.openPopup();
    });

  }

  $scope.$on('changetype', function(event, placearr, ischecked, input) {
    if (ischecked != true) {
      placesOnMap.showPoints(input, self.types, self.points, ischecked);
    }

    placesOnMap.addPlaces(input);
    for (var j = 0; j < placearr.length; j++) {
      setMarker(placearr[j]);
    }

  });
}
