angular.module('eventList', [])
  .component('eventList', {
  templateUrl: 'components/event/event-list/event-list.template.html',
  controller: ['$scope', 'calendarService', 'Event', function ($scope, calendarService, Event) {
    $scope.calendars = calendarService;
    $scope.calendars.clear() ;

    $scope.calendars.click = function () {
    $scope.events = $scope.calendars.events.filter(function (event) {
    return new Date(event.date_start) >= $scope.calendars.values[0] && new Date(event.date_end) <= $scope.calendars.values[1];
    });
  };

  if ($scope.calendars.events.length == 0)
    {
      Event.getList().then(function (result) {
      $scope.calendars.events = result.concat(event);
      $scope.calendars.click();
    })
  };

  this.findWord = function(reg){
    $scope.events = $scope.calendars.events.filter(function(event) {
      console.log('event.name'+event.name+' reg= ' + reg) ;
      if (!event.name || !event.description) return false ;
      if ((event.name.toUpperCase().search(reg.toUpperCase())>-1) || ((event.description.toUpperCase().search(reg.toUpperCase())>-1))) return true ;
    }) ;
  }

  $scope.calendars.click();
  }]
});
