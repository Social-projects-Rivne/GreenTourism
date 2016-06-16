app.config(function($routeProvider) {
  $routeProvider.
    when('/', {
      template: '<welcome-page></welcome-page>'
    }).
    when('/places', {
      template: '<place-list></place-list>'
    }).
    when('/places/:placeId', {
      template: '<place-detail></place-detail>'
    }).
	// add events and otherwise
	when('/events', {
      template: '<events></events>'
    }).
  when('/tracks', {
      template: '<track-list></track-list>'
  }).
  when('/autorization/signup', {
      template: '<signup></signup>'
  }).
  when('/autorization/signin', {
      template: '<signin></signin>'
  }).
  when('/profile', {
    template: '<user-profile></user-profile>'
  }).
  when('/events/event', {
    template: '<event></event>'
  }).
	otherwise('/', {
      template: '<welcome-page></welcome-page>'
    });
});
