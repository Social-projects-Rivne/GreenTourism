angular.module('greenTourism', [
  'ngRoute',  // Routing
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
