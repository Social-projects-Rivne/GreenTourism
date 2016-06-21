angular.module('trackFilter', [])
.component('trackFilter', {
    templateUrl: 'components/tracks/track-filter/track-filter.template.html',
    controller: function trackFilterController($http, $rootScope) {
        var ctrlScope = this;
        $rootScope.tracks = [];
        
        $http.get('components/tracks/tracks.data.json').then(function (data) {
            // fetching data about tracks from json
            ctrlScope.tracks = data.data; 
            // adding all tracks on map
            for (var i = 0; i < ctrlScope.tracks.length; i++) {
                var polyline = L.polyline(ctrlScope.tracks[i].track_points, {color: ctrlScope.tracks[i].color, opacity: 1}).addTo($rootScope.map);
                $rootScope.tracks.push([polyline, ctrlScope.tracks[i].type]);
            } 
        }, function (data) {
            ctrlScope.tracks = "error";
        });
        
        $http.get('components/tracks/tracks.type.json').then(function (data) {
            
            // fetching data about track types from json
            ctrlScope.types = data.data; 
        }, function (data) {
            ctrlScope.types = "error";
        });
        
        
        // method for filtering tracks, which calls when user click on filter   
        ctrlScope.showSpecificTracks = function (inputValue) {
            var element = $("#" + inputValue);
            var icon = $("#gi" + inputValue);
            for (var i = 0; i < $rootScope.tracks.length; i++) {
                if (element[0].className == "") {                   
                    if (inputValue == $rootScope.tracks[i][1]) {
                        $rootScope.tracks[i][0].addTo($rootScope.map);
                    } 
                } else {
                    if (inputValue == $rootScope.tracks[i][1]) {
                        $rootScope.map.removeLayer($rootScope.tracks[i][0]);
                    }
                }
            }
            if (element[0].className == "active") {
                element.removeClass("active");
                icon.removeClass("glyphicon glyphicon-ok");
            } else {
                element.addClass("active");
                icon.addClass("glyphicon glyphicon-ok");
            }
        };
        
        //protection from hiding dropdown menu after clicking on filter (thanks to max.yushchuk)
        $('.dropdown-menu').on({
            'click': function (e) {
                e.stopPropagation();
            }
        });
    }
  });