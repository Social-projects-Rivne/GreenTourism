/*var mapid = document.getElementById('mapid');
mapid.width = window.innerWidth - 20;
mapid.height = window.innerHeight - 60;
*/
// Create a map in the "map" div, set the view to a given place and zoom
var map = L.map('mapid').setView([51.505, -0.09], 13);

// Add an OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&amp;copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

var marker = L.marker([51.5, -0.09]).addTo(map);
