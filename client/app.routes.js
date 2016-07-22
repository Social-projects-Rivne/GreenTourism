angular.module('greenTourism').config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.caseInsensitiveMatch = true;

    $routeProvider
      .when('/', {
        template: '<welcome-page></welcome-page>'
      })
      .when('/profile', {
        template: '<user-profile user="$resolve.user"></user-profile>',
        resolve: {
          user: ['User', 'currentUser', '$location',
            function getPlace(User, currentUser, $location) {
              if (currentUser) {
                return User.one(currentUser._id).get()
                  .then(function(user) {
                    return user;
                  });
              }

              $location.path('/');
            }
          ]
        }
      })
      .when('/places', {
        template: '<place-list></place-list>'
      })
      .when('/places/:placeId', {
        template: '<place-detail place="$resolve.place"></place-detail>',
        resolve: {
          place: ['$route', 'Place', function getPlace($route, Place) {
            return Place.one($route.current.params.placeId).get()
              .then(function(place) {
                return place;
              });
          }]
        }
      })
      .when('/events', {
        template: '<event-list></event-list>'
      })
      .when('/events/:eventId', {
        template: '{{$ctrl.eventId}}<event-detail></event-detail>'  // TODO: Remove $ctrl.eventId from here (use resolve instead)
      })
      .when('/eventsmap', {
        template: '<events-map></events-map>'
      })
      .when('/eventsmap/:lat/:lng/:type/:date_start', {  // TODO: Remove this from routes (use query strings instead)
        template: '{{$ctrl.lat}}{{$ctrl.lng}}{{$ctrl.type}}{{$ctrl.date_start}}<events-map></events-map>'  // TODO: Leave only <events-map> here
      })
      .when('/events/:eventId/:dataId', { // TODO: Remove this from routes (use query strings instead)
        template: '{{$ctrl.eventId}}{{$ctrl.dataId}}<event-detail></event-detail>'
      })
      .when('/blog', {  // TODO: Rename to blogs
        template: '<blog-list blogs="$resolve.blogs"></blog-list>',
        resolve: {
          blogs: ['Blog', function BlogListController(Blog) {
            return Blog.getList().then(function(blogs) {
              return blogs;
            });
          }]
        }
      })
      .when('/blog/:blogId', {  // TODO: Rename to blogs/:blogId
        template: '<blog-detail blog="$resolve.blog"></blog-detail>',
        resolve: {
          blog: ['$route', 'Blog', function BlogDetailController($route, Blog) {
            return Blog.one($route.current.params.blogId).get()
              .then(function(blog) {
                return blog;
              });
          }]
        }
      })
      .otherwise({
        templateUrl: 'shared/errors/404.html'
      });
  }]);
