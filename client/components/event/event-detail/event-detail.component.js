angular.module('eventDetail').component('eventDetail', {
  templateUrl: 'components/event/event-detail/event-detail.template.html',
  controller: ['$scope', 'currentUser', '$routeParams', 'calendarService', 'Event',
    function($scope, currentUser, $routeParams, calendarService, Event) {
      this._id = $routeParams.eventId;
      this.user = currentUser;
        console.log(currentUser) ;

      $scope.calendars = calendarService;

      $scope.calendars.clear() ;

      if ($scope.calendars.events.length == 0)
      {
          Event.getList().then(function (result) {
          $scope.calendars.events = result.concat(event);
        })
      };

      $scope.eventListService = $scope.calendars.events;

   }]
});
