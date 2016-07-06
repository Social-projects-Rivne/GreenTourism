angular.module('greenTourism', [
  'ngRoute',  // Routing
  'restangular',  // REST communication with server
  'ngAnimate',  // TODO: Is this necessary for greenTourism main module?
  'welcomePage',

  'signup',
  'signin',  // TODO: Rename to login
  'userProfile',

  'place',
  'track',
  'event',
  'blog'

]);
