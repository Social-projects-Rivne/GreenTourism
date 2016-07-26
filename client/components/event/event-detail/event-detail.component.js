angular.module('eventDetail').component('eventDetail', {
  templateUrl: 'components/event/event-detail/event-detail.template.html',
  controller: ['$scope', '$routeParams', 'calendarService', 'Event',
    function($scope, $routeParams, calendarService, Event) {
      this._id = $routeParams.eventId;

      $scope.calendars = calendarService.th;

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
