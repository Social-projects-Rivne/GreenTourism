app.config(function($routeProvider) {
  $routeProvider.
    when('/', {
      template: '<welcome-page></welcome-page>',
    }).
    when('/places', {
      template: '<place-list></place-list>',
    }).
    when('/places/:placeId', {
      template: '<place-detail></place-detail>'
    });
});
