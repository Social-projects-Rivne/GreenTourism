'use strict';

angular.module('mapModule', [])
    .factory('mapFactory', function() {
      var mapFactory = {};
      var Streets;
      var map;
      mapFactory.showMap = function() {
        Streets = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
         attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
         });

        map = L.map('map', {
          center: [50.6234, 26.2189],
          zoom: 14
        });
        mapFactory.map = map;
        map.addLayer(Streets);
        return map;

      };

      /* var Outdoors = L.tileLayer('http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png', {
       attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
       });

       var Satellite = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
       attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
       });*/
      /*    var Streets = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
       attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
       });

       var map = L.map('map', {
       center: [50.6234, 26.2189],
       zoom: 14
       });

       map.addLayer(Streets);
       $("#Streets span").addClass('glyphicon glyphicon-ok');*/

      /*$rootScope.map.locate({setView: true, maxZoom: 14});

       function onLocationFound(e) {

       L.marker(e.latlng).addTo($rootScope.map)
       .bindPopup("You are here").openPopup();

       $rootScope.userLocationArea = L.circle(e.latlng, 3000).addTo($rootScope.map);
       }

       $rootScope.map.on('locationfound', onLocationFound);*/
      return mapFactory;
    });
