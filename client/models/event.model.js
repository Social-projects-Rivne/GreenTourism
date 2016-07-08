angular.module('eventModel', ['restangular'])
  .factory('Event', ['Restangular', function Event(Restangular) {
    var Event = Restangular.service('events');

    // Custom methods goes here

    return Event;
  }]);
