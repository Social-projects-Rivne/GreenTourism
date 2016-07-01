angular.module('greenTourism').config(function($routeProvider) {
  $routeProvider
    .when('/', {
      template: '<welcome-page></welcome-page>'
    })
    .when('/places', {
      template: '<place-list></place-list>'
    })
    .when('/places/:placeId', {
      template: '<place-detail></place-detail>'
    })
    .when('/tracks', {
      template: '<track-list></track-list>'
    })
    .when('/autorization/signup', {
      template: '<signup></signup>'
    })
    .when('/autorization/signin', {
      template: '<signin></signin>'
    })
    .when('/profile', {
      template: '<user-profile></user-profile>'
    })
    .when('/events', {
      template: '<events></events>'
    })
    .when('/events/event', {
      template: '<event></event>'
    })
    .when('/eventsmap', {
      template: '<events-map></events-map>'
    })
    .when('/eventsmap/:lat/:lng/:type/:date_start', {
      template: '{{$ctrl.lat}}{{$ctrl.lng}}{{$ctrl.type}}{{$ctrl.date_start}}<events-map></events-map>'
    })
    .when('/events/:eventId', {
      template: '{{$ctrl.eventId}}<event></event>',
    })
    .when('/events/:eventId/:dataId', {
      template: '{{$ctrl.eventId}}{{$ctrl.dataId}}<event></event>',
    })
    .when('/blog', {
      template: '<blog-list></blog-list>'
    })
    .when('/blog/:blogId', {
      template: '<blog-detail></blog-detail>'
    })
    .otherwise('/', {
      template: '<welcome-page></welcome-page>'
    });
});
