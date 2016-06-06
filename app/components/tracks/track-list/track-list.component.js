angular.module('trackList', [])
.component('trackList', {
    templateUrl: 'components/tracks/track-list/track-list.template.html',
    controller: ['$http',  function trackListController($http) {
        var ctrlScope = this;
        var tracks = [];
        ctrlScope.walkingActive = true;
        ctrlScope.carActive = true;
        ctrlScope.bycicleActive = true;
        ctrlScope.mixedActive = true;
        
        $http.get("components/tracks/track-list/tracks.data.json").success(function (data) {
            ctrlScope.tracks = data;
            var mymap = L.map('map').setView([50.61734, 26.25217], 13);         
                            
            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a rel="nofollow" href="http://osm.org/copyright">OpenStreetMap</a> contributors | GreenTourism'
            }).addTo(mymap);
            
            for (var i = 0; i < ctrlScope.tracks.length; i++) {
                var polyline = L.polyline([ctrlScope.tracks[i].track_points], {color: ctrlScope.tracks[i].color}).addTo(mymap);
                tracks.push([polyline, ctrlScope.tracks[i].type]);
            }

            // zoom the map to the polyline
            //mymap.fitBounds(polyline.getBounds());
            ctrlScope.showSpecificTracks = function (inputValue, type) {
                for (var i = 0; i < tracks.length; i++) {
                    if (inputValue) {                   
                        if (type == ctrlScope.tracks[i].type) {
                            tracks[i][0].addTo(mymap);
                        } 
                    } else {
                        if (type == ctrlScope.tracks[i].type) {
                            mymap.removeLayer(tracks[i][0]);
                        }
                    }
                }
            };
            console.log(tracks);
        }).error(function (data) {
            ctrlScope.tracks = "error";
        });
    }]
  });