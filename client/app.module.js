angular.module('greenTourism', [
  'ngRoute',  // Routing
  'ngCookies',
  'ngAnimate',  // TODO: Is this necessary for greenTourism main module?

  'welcomePage',

  'auth',
  'userProfile',

  'place',
  'track',
  'event',
  'blog'
]);
