angular.module('eventDetail').component('eventDetail', {
  templateUrl: 'components/event/event-detail/event-detail.template.html',
  controller: ['$scope', 'currentUser', '$routeParams', 'calendarService', 'Event',
    function($scope, currentUser, $routeParams, calendarService, Event) {
      this._id = $routeParams.eventId;
      this.user = currentUser;

      $scope.calendars = calendarService;

      $scope.calendars.clear() ;

      if ($scope.calendars.events.length == 0)
      {
          Event.getList().then(function (result) {
          $scope.calendars.events = result.concat(event);
        })
      };

      $scope.imgPath = function(str){
        if (!indexOf('http')) return str ;
        else return
      }

      $scope.eventListService = $scope.calendars.events;

   }]
});
