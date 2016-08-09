angular.module('filterMapType', [])
  .component('filterMapType', {
    templateUrl: 'shared/filter-map-type/filter-map-type.template.html',
    controller: ['mapFactory', 'mapMarkingTypes', 'constants',
      function(mapFactory, mapMarkingTypes, constants) {
        var ctrl = this;
        ctrl.layers = mapMarkingTypes.layers;

        var map = mapFactory.map;
        map.addLayer(
          L.tileLayer(ctrl.layers.streets.link, {
            attribution: ctrl.layers.streets.attribute
          })
        );

        this.showTileLayer = function(input) {
          angular.element('.map-layer span')
            .removeClass(constants.checkedSpanClass);
          angular.element('#' + input + ' span')
            .addClass(constants.checkedSpanClass);

          for (var key in ctrl.layers) {
            if ({}.hasOwnProperty.call(ctrl.layers, key)) {
              if (key === input) {
                map.addLayer(
                  L.tileLayer(ctrl.layers[key].link, {
                    attribution: ctrl.layers[key].attribute
                  })
                );
              } else {
                map.removeLayer(
                  L.tileLayer(ctrl.layers[key].link, {
                    attribution: ctrl.layers[key].attribute
                  })
                );
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
