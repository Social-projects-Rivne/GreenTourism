angular.module('filterMapType', [])
  .component('filterMapType', {
    templateUrl: 'shared/filter-map-type/filter-map-type.template.html',
    controller: function FilterMapTypeController(mapFactory) {
      var map;
      this.maptype = ['Streets', 'Satellite', 'Outdoors'];

      var Streets = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      });
      var Outdoors = L.tileLayer('http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });

      var Satellite = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      });

      map = mapFactory.map;
      map.addLayer(Streets);

      this.showTileLayer = function(input) {
        for (var i = 0; i < this.maptype.length; i++) {
          if (this.maptype[i] == input)
            $('#' + input + ' span').addClass('glyphicon glyphicon-ok');
          else $('#' + this.maptype[i] + ' span')
                .removeClass('glyphicon glyphicon-ok');
        }

        if (input == 'Streets') {
          map.removeLayer(Satellite);
          map.removeLayer(Outdoors);
          map.addLayer(Streets);
        }
        if (input == 'Satellite') {
          map.removeLayer(Outdoors);
          map.removeLayer(Streets);
          map.addLayer(Satellite);
        }
        if (input == 'Outdoors') {
          map.removeLayer(Satellite);
          map.removeLayer(Streets);
          map.addLayer(Outdoors);
        }
      };

      //Don't hide dropdown if clicked
      $('#dropdownFilterMapType .dropdown-menu').on({
        'click': function(e) {
          e.stopPropagation();
        }
      });
    }
  });
