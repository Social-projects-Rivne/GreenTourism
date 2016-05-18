var app = angular.module('greenTourism', ['ngRoute']);
app.config(function($routeProvider) {
  $routeProvider.
    // Треба визначитись з точним URL для маркерів
    when('/points', {
      templateUrl: 'views/points.html',
      controller: 'PointsCtrl',
    });
});

app.controller('PointsCtrl', function() {
  var map = L.map('map').setView([51.505, -0.09], 13);

  // Add an OpenStreetMap tile layer
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&amp;copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

  var marker = L.marker([51.5, -0.09]).addTo(map);

});
