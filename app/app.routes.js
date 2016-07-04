angular.module('greenTourism').config(function($routeProvider) {
  $routeProvider
    .when('/', {
      template: '<welcome-page></welcome-page>'
    })

    .when('/signup', {
      template: '<signup></signup>'
    })
    .when('/signin', {  // TODO: Rename to login
      template: '<signin></signin>'
    })
    .when('/profile', {
      template: '<user-profile></user-profile>'
    })

    .when('/places', {
      template: '<place-list></place-list>'
    })

    .when('/places/:placeId', {
      template: '<place-detail place="$resolve.place"></place-detail>',
      resolve: {
        place: function getPlace($route, Place) {
          return Place.one($route.current.params.placeId).get()
            .then(function(place) {
              return place;
            });
        }
      }
    })

    .when('/tracks', {
      template: '<track-list></track-list>'
    })

    .when('/events', {  // TODO: Rename to eventList
      template: '<events></events>'
    })
    .when('/events/:eventId', {
      template: '{{$ctrl.eventId}}<event></event>',  // TODO: Remove $ctrl.eventId from here (use $routeParams instead)
    })
    .when('/eventsmap', {
      template: '<events-map></events-map>'
    })
    .when('/events/event', {  // TODO: Remove this from routes
      template: '<event></event>'
    })
    .when('/eventsmap/:lat/:lng/:type/:date_start', {  // TODO: Remove this from routes (use query strings instead)
      template: '{{$ctrl.lat}}{{$ctrl.lng}}{{$ctrl.type}}{{$ctrl.date_start}}<events-map></events-map>'  // TODO: Leave only <events-map> here
    })
    .when('/events/:eventId/:dataId', { // TODO: Remove this from routes (use query strings instead)
      template: '{{$ctrl.eventId}}{{$ctrl.dataId}}<event></event>',
    })

    .when('/blog', {  // TODO: Rename to blogs
      template: '<blog-list></blog-list>'
    })
    .when('/blog/:blogId', {  // TODO: Rename to blogs/:blogId
      template: '<blog-detail></blog-detail>'
    })

    .when('/404', {
      templateUrl: '404.html'
    })
    .when('/500', {
      templateUrl: '500.html'
    })

    .otherwise({
      templateUrl: '404.html'
    });
});
