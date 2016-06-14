'use strict';

angular.module('filterMapType',[])
  .component('filterMapType', {
    templateUrl: 'components/place/filter-map-type/filter-map-type.template.html',
    controller: 
      function FilterMapTypeController($rootScope) {
        this.maptype = ['Streets', 'Satellite', 'Outdoors'];
        
        this.showTileLayer = function(input) {       
          var Streets = $rootScope.Streets;
          var Satellite = $rootScope.Satellite;
          var Outdoors = $rootScope.Outdoors;

          for (var i = 0; i < this.maptype.length; i ++) {
            if (this.maptype[i] == input) 
              angular.element("#" + input + " span").addClass('glyphicon glyphicon-ok');
              else angular.element("#" + this.maptype[i] + " span").removeClass('glyphicon glyphicon-ok');
          }

          if (input == 'Streets') {
            $rootScope.map.removeLayer(Satellite);
            $rootScope.map.removeLayer(Outdoors);
            $rootScope.map.addLayer(Streets);
          }
          if (input == 'Satellite') {
            $rootScope.map.removeLayer(Outdoors);
            $rootScope.map.removeLayer(Streets);
            $rootScope.map.addLayer(Satellite);
          }
          if (input == 'Outdoors') {
            $rootScope.map.removeLayer(Satellite);
            $rootScope.map.removeLayer(Streets);
            $rootScope.map.addLayer(Outdoors);
          }
        };

        //Don't hide dropdown if clicked
        $('#dropdownFilterMapType .dropdown-menu').on({
          "click":function(e){
            e.stopPropagation();
          }
        });
      }
  });
