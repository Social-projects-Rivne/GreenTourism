angular.module('trackFilter', [])
.component('trackFilter', {
    templateUrl: 'components/tracks/track-filter/track-filter.template.html',
    controller: function trackFilterController($http) {
        var ctrlScope = this;
        var tracks = [];
        
        $http.get('components/tracks/tracks.data.json').then(function (data) {
            // fetching data about tracks from json
            ctrlScope.tracks = data; 
            
            // adding all tracks on map
            for (var i = 0; i < ctrlScope.tracks.data.length; i++) {
                var polyline = L.polyline([ctrlScope.tracks.data[i].track_points], {color: ctrlScope.tracks.data[i].color}).addTo(mymap);
                tracks.push([polyline, ctrlScope.tracks.data[i].type]);
            } 
        }, function (data) {
            ctrlScope.tracks = "error";
        });
        
        $http.get('components/tracks/tracks.type.json').then(function (data) {
            
            // fetching data about track types from json
            ctrlScope.types = data; 
        }, function (data) {
            ctrlScope.types = "error";
        });
          
        // creating map
        var mymap = L.map('map').setView([50.61734, 26.25217], 13);
               
        //adding openstreetmap layer on the map
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a rel="nofollow" href="http://osm.org/copyright">OpenStreetMap</a> contributors | GreenTourism'
        }).addTo(mymap);
        
        // method for filtering tracks, which calls when user click on filter   
        ctrlScope.showSpecificTracks = function (inputValue) {
            var element = $("#" + inputValue);
            var icon = $("#gi" + inputValue);
            console.log(icon[0]);
            for (var i = 0; i < tracks.length; i++) {
                if (element[0].className == "") {                   
                    if (inputValue == tracks[i][1]) {
                        tracks[i][0].addTo(mymap);
                    } 
                } else {
                    if (inputValue == tracks[i][1]) {
                        mymap.removeLayer(tracks[i][0]);
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