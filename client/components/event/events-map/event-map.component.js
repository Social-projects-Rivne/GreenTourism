'use strict';

angular.module('eventsMap', ['calendar', 'eventMapType'])
  .component('eventsMap', {
    templateUrl: 'components/event/events-map/event-map.template.html',
    controller: ['$scope', '$routeParams', '$http', 'eventMapService', 'eventListService',
      function($scope, $routeParams, $http, eventMapService, eventListService) {
        $scope.mapDanni = eventMapService.th_;

        this.lat = $routeParams.lat;
        if (!$routeParams.lat) this.lat = 50.6234;
        else $scope.mapDanni.x = $routeParams.lat;
        this.lng = $routeParams.lng;
        if (!$routeParams.lng) this.lng = 26.2189;
        else $scope.mapDanni.y = $routeParams.lng;
        this.type = $routeParams.type;
        if (!$routeParams.type) this.type = 'Game';
        this.date_start = $routeParams.date_start;
        if (!$routeParams.type) this.date_start = new Date();

        $scope.map = L.map('mapevent', {
          center: [50.6234, 26.2189],
          zoom: 14
        });
        $scope.groups = L.layerGroup();

        var Outdoors = L.tileLayer('http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });
        var Streets = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        });
        var Satellite = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        });

        $scope.map.removeLayer(Satellite);
        $scope.map.removeLayer(Outdoors);
        $scope.map.removeLayer(Streets);

        switch ($scope.mapDanni.layerMap) {
          case 'Satellite':
            $scope.map.addLayer(Satellite);
          case 'Streets':
            $scope.map.addLayer(Streets);
          case 'Outdoors':
            $scope.map.addLayer(Outdoors);
          default:
            $scope.map.addLayer(Outdoors);
        }

        $scope.map.addLayer(Streets);
        $scope.map.setView(new L.LatLng($scope.mapDanni.x, $scope.mapDanni.y), $scope.mapDanni.z);

        $scope.eventL = eventListService.th;
        $scope.eventL.clear();
        $scope.eventL.Item_type_menu = this.type;
        $scope.eventL.CalendarValue[0] = this.date_start;
        $scope.eventL.CalendarValue[1] = +this.date_start + 31 * 24 * 60 * 60 * 1000;

        this.data = $http.get('components/event/events/event.data.json').success(function(data) {
          $scope.eventL.event = data;
          return data;
        }, function(data) {
          console.log('Error : Could not load JSON Event in angular.module - event ');
          return 'error';
        });

        $http.get('components/event/events/event.data.json').success(function(data) {
          $scope.eventL.event = data;

          $scope.eventL.all_type();
          $scope.eventL.Type_menu[$scope.eventL.Type.indexOf($scope.eventL.Item_type_menu)].active = true;

          return data;
        }, function(data) {
          return 'error';
        });

        $scope.eventL.mainController = this;
        $scope.eventL.mainControllerName = 'MapEvent';

        $scope.marker_click = function(lat, lng) {
          $scope.filters = $scope.eventL.find_event($scope.eventL.CalendarName[0].calendar_show_date, $scope.eventL.CalendarName[1].calendar_show_date, $scope.eventL.active_type());
          var clicks_arr = [];
          var sort_arr = [];

          for (var i = 0; i < $scope.filters.length; i++) {
            if (($scope.filters[i].event_points[0].lat == lat) && ($scope.filters[i].event_points[0].lon == lng)) {
              clicks_arr.push($scope.filters[i]); //alert($scope.filters[i].name);
              sort_arr.push($scope.filters[i].date_start - $scope.eventL.CalendarName[0].calendar_show_date);
            }
          }

          var better_event = Math.min.apply(null, sort_arr);
          location.href = '#!/events/' + clicks_arr[sort_arr.indexOf(better_event)].id;
        };

        this.temp_click = function() {
          if ($scope.eventL.active_type().length != 0) $scope.filters = $scope.eventL.find_event($scope.eventL.CalendarName[0].calendar_show_date, $scope.eventL.CalendarName[1].calendar_show_date, $scope.eventL.active_type());
          else {
            if (this.type) {
              //alert('hi') ;
              $scope.filters = $scope.eventL.find_event($scope.eventL.CalendarName[0].calendar_show_date, $scope.eventL.CalendarName[1].calendar_show_date, [this.type]);
            }
          }

          $scope.groups.clearLayers();
          $scope.groups.removeLayer($scope.map);

          for (var i = 0; i < $scope.filters.length; i++) {
            switch ($scope.filters[i].type) {
              case 'Game':

                var greenIcon = L.icon({
                  iconUrl: 'assets/img/events/icon_type/game.png',
                  shadowUrl: 'assets/img/events/festival1.jpg',

                  iconSize: [65, 45], // size of the icon
                  shadowSize: [0, 0], // size of the shadow
                  iconAnchor: [12, 14], // point of the icon which will correspond to marker's location
                  shadowAnchor: [4, 22], // the same for the shadow
                  popupAnchor: [53, 76] // point from which the popup should open relative to the iconAnchor
                });
                break;
              case 'Festival':
                var greenIcon = L.icon({
                  iconUrl: 'assets/img/events/icon_type/festival.gif',
                  shadowUrl: 'assets/img/events/festival1.jpg',

                  iconSize: [45, 65], // size of the icon
                  shadowSize: [0, 0], // size of the shadow
                  iconAnchor: [12, 14], // point of the icon which will correspond to marker's location
                  shadowAnchor: [4, 22], // the same for the shadow
                  popupAnchor: [53, 76] // point from which the popup should open relative to the iconAnchor
                });
                break;
              case 'Meeteng':
                var greenIcon = L.icon({
                  iconUrl: 'assets/img/events/icon_type/meetings.gif',
                  shadowUrl: 'assets/img/events/festival1.jpg',

                  iconSize: [65, 45], // size of the icon
                  shadowSize: [0, 0], // size of the shadow
                  iconAnchor: [12, 14], // point of the icon which will correspond to marker's location
                  shadowAnchor: [4, 22], // the same for the shadow
                  popupAnchor: [53, 76] // point from which the popup should open relative to the iconAnchor
                });
                break;
              case 'Research':
                var greenIcon = L.icon({
                  iconUrl: 'assets/img/events/icon_type/research.png',
                  shadowUrl: 'assets/img/events/festival1.jpg',

                  iconSize: [40, 65], // size of the icon
                  shadowSize: [0, 0], // size of the shadow
                  iconAnchor: [12, 14], // point of the icon which will correspond to marker's location
                  shadowAnchor: [4, 22], // the same for the shadow
                  popupAnchor: [53, 76] // point from which the popup should open relative to the iconAnchor
                });
                break;
              default:
                var greenIcon = L.icon({
                  iconUrl: 'assets/img/events/icon_type/festival.gif',
                  shadowUrl: 'assets/img/events/festival1.jpg',

                  iconSize: [45, 65], // size of the icon
                  shadowSize: [0, 0], // size of the shadow
                  iconAnchor: [12, 14], // point of the icon which will correspond to marker's location
                  shadowAnchor: [4, 22], // the same for the shadow
                  popupAnchor: [53, 76] // point from which the popup should open relative to the iconAnchor
                });
            }

            var id = $scope.filters[i].id;
            var marker1 = L.marker([$scope.filters[i].event_points[0].lat, $scope.filters[i].event_points[0].lon], {
              icon: greenIcon
            }).on('click', function onClick(e) {
              $scope.marker_click(this.getLatLng().lat, this.getLatLng().lng);
            });

            marker1.addTo($scope.groups);
          }

          $scope.closeEvent = $scope.eventL.find_distanse($scope.map.getCenter().lat, $scope.map.getCenter().lng, $scope.filters);
          $scope.groups.addTo($scope.map);
        };

        var chamgeEvents = function() {
          $scope.closeEvent = $scope.eventL.find_distanse($scope.map.getCenter().lat, $scope.map.getCenter().lng, $scope.filters);
          $scope.$apply();
        };

        $scope.map.on('moveend', function(e) {
          chamgeEvents();
        });
      }
    ]
  });

angular.module('eventsMap').service('eventMapService', ['$http', function($http) {
  this.layerMap = 'Streets';
  this.x = 50.6234;
  this.y = 26.2189;
  this.z = 12;

  return {
    th_: this
  };
}]);
