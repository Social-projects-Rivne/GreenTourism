angular.module('editEvent', []);
angular.module('editEvent').component('editEvent', {
  templateUrl: 'components/event/edit-event/edit-event.template.html',
  controller: ['$scope', '$routeParams', 'calendarService', 'Event',
    function($scope, $routeParams, calendarService, Event) {
      this._id = $routeParams.eventId;

      Event.one(id).get()
        .then(function(event) {
                // Робиш все що хочеш з прийшовшим івентом
        });

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
