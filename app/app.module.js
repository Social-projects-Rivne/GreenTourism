angular.module('greenTourism', [
  'ngRoute',  // Routing
  'ngResource',  // API communication and models
  'ngAnimate',  // TODO: Is this necessary for greenTourism main module?
  'welcomePage',

  'signup',
  'signin',  // TODO: Rename to login
  'userProfile',

  'placeList',
  'placeDetail',
  'placeModal',  // TODO: Move this to placeList
  'locationPlaces',  // TODO: Move this to places dependencies (or remove)
  'popularPlaces',  // TODO: Move this to places dependencies (or remove)

  'trackList',
  //'trackDetail',

  'events', // TODO: Rename to eventList
  'event',  // TODO: Rename to eventDetail
  'eventsMap',
  'calendar',  // TODO: Move this to events dependencies

  'blogList',
  'blog'  // TODO: Rename to blogDetail
]);
