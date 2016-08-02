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
      console.log('reg= '+reg) ;
        Event.getList({search: reg }).then(function (result) {
        $scope.events = result.concat(event);
        console.log('num= '+$scope.events.length) ;
      }) ;
    } ;

    this.__findWord = function(reg){
        console.log('reg= '+reg) ;
        //Event.getList({name: reg, limit: 100}).then(function (result) {
        Event.getList({name: { $search: reg }}).then(function (result) {
          $scope.events = result.concat(event);
          console.log('num= '+$scope.events.length) ;
        }) ;
    } ;

  this._findWord = function(reg){
    $scope.events = $scope.calendars.events.filter(function(event) {
      if (!event.name || !event.description) return false ;
      if ((event.name.toUpperCase().search(reg.toUpperCase())>-1) || ((event.description.toUpperCase().search(reg.toUpperCase())>-1))) return true ;
    }) ;
  }

  $scope.calendars.click();
  }]
});
