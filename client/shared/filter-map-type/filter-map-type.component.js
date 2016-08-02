angular.module('filterMapType', [])
  .component('filterMapType', {
    templateUrl: 'shared/filter-map-type/filter-map-type.template.html',
    controller: ['mapFactory', 'mapMarkingTypes', 'constants',
      function(mapFactory, mapMarkingTypes, constants) {
        var ctrl = this;
        ctrl.layers = mapMarkingTypes.layers;

        var map = mapFactory.map;
        map.addLayer(ctrl.layers.streets.layer);

        this.showTileLayer = function(input) {
          angular.element('.map-layer span')
            .removeClass(constants.checkedSpanClass);
          angular.element('#' + input + ' span')
            .addClass(constants.checkedSpanClass);

          for (var key in ctrl.layers) {
            if ({}.hasOwnProperty.call(ctrl.layers, key)) {
              if (key === input) {
                map.addLayer(ctrl.layers[key].layer);
              } else {
                map.removeLayer(ctrl.layers[key].layer);
              }
            }
          }
        };

        // Don't hide dropdown if clicked
        angular.element('#dropdownFilterMapType .dropdown-menu').on({
          click: function(e) {
            e.stopPropagation();
          }
        });
      }]
  });
