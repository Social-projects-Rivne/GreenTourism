angular.module('eventList', [])
    .component('eventList', {
        templateUrl: 'components/event/event-list/event-list.template.html',
        controller: ['$scope', '$http', 'calendarService', 'Place', 'Event', function ($scope, $http, calendarService, Place, Event) {
            $scope.calendars = calendarService.th;
            $scope.calendars.click = function () {
                console.log(' Wau !!! ');
                Event.getList().then(function (result) {
                    $scope.calendars.events = result.concat(event);
                    $scope.dann = $scope.calendars.events.filter(function (eve) {
                        return new Date(eve.date_start) >= $scope.calendars.values[0] && new Date(eve.date_end) <= $scope.calendars.values[1];
                    });
                    console.log($scope.dan);
                });
            };
            $scope.calendars.click();
  }]
    });
