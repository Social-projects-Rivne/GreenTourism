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
    }).
	// add events and otherwise
	when('/events', {
      template: '<events></events>'
    }).
  when('/autorization/signup', {
      template: '<signup></signup>'
  }).
  when('/autorization/login', {
      template: '<login></login>'
  }).
	otherwise('/', {
      template: '<welcome-page></welcome-page>',
    });
});
