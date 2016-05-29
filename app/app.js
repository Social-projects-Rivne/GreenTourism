var app = angular.module('greenTourism', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: '<welcome-page></welcome-page>',
    }).
    when('/places', {
      templateUrl: '<place-list></place-list>',
    }).
    when('/places/:placeId', {
      templateUrl: '<place-detail></place-detail>'
    });
});
