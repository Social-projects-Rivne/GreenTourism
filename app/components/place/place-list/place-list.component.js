'use strict';

angular.module('placeList', ['filterCategory', 'filterMapType', 'showMap','ngResource','ui.bootstrap'])
.component('placeList', {
    templateUrl: 'components/place/place-list/place-list.template.html',
    controller: ParentController,
  });
function ParentController(placeModel,placesOnMap, $scope, $compile, $timeout) {
    self.points = placeModel.getPlaceList.query();
    var arrPlaces = [];
    var pointsTypeForShowOnLoad = 'Featured_Place';
    self.types = placeModel.getPlaceTypes.query();
    $timeout(function() {
        placesOnMap.initGroupsOfPlaces(self.types);
        placesOnMap.showPoints(pointsTypeForShowOnLoad,self.types,self.points,true );
        placesOnMap.showPlacesOnLoad(arrPlaces,pointsTypeForShowOnLoad);
        var placearr=placeModel.placesArray;
        for (var j = 0; j<placearr.length; j++) {
            setMarker(placearr[j]);
        }
    }, 50);
    //placesOnMap.removeAllPlaces();
    function setMarker(point) {
        var URL = "assets/";
        var placeid = point.id;
        var title = point.name;
        var image = point.photo;
        var marker=point.marker;
        var L=point.l;
        var myPopup = L.DomUtil.create('div', 'marker-link'+placeid);
        marker.bindPopup(myPopup);
        marker.on('mouseover', function (e) {
         var linkFn = $compile("<div><h3>" + title + "</h3><a><img class='marker-image' src='" + URL + image + "' /></a><br /><marker  placeid='"+placeid+"' id='info-marker"+placeid+"'></marker></div>")($scope);
          var element = linkFn;
          this._popup.setContent(element[0]);
          this.openPopup();
        });

    }

    $scope.$on('changetype', function (event, placearr, ischecked,input) {
        if(ischecked!=true){
        placesOnMap.showPoints(input,self.types,self.points,ischecked);
         }

        placesOnMap.addPlaces(input);
        for (var j = 0; j <placearr.length; j++) {
         setMarker(placearr[j]);
        }

     });
    };
angular.module('placeList')
    .component('marker', {
        controller:function markerController($compile, $scope) {
            console.log("CONTROLLER IS CONNECTED");
            var $ctrl = this;
            this.placemyid=this.placeid;
            console.log("this.placemyid="+this.placemyid);

            $ctrl.openwind=function(id){
                alert("fsdgsdgsdgsdgsdgsdgsdgsdgsdgsdgsdgsdgs");
                console.log("OPENED id="+id);
               // self.placeinfo = Places.getOnePlace(function() {

               // });
            }
        },
        bindings: {
            placeid: '=',
            openwind: '&'
        },
        template: function($element, $attrs) {
            return "<button  type='button'  ng-click=\'$crtl.openwind("+$attrs.placeid+")\'>OPEN</button>";
            //class='btn btn-primary btn-lg' data-toggle='modal' data-target='#myModal'

        }

    });