angular.module('eventList', [])
  .component('eventList', {
  templateUrl: 'components/event/event-list/event-list.template.html',
  controller: ['$scope', 'calendarService','Event', function ($scope, calendarService, Event) {

    $scope.calendars = calendarService;
    $scope.calendars.clear() ;

    $scope.calendars.click = function () {
      console.log('From: ' + Date.parse($scope.calendars.values[0])) ;
      console.log('To: ' + Date.parse($scope.calendars.values[1])) ;
        Event.getList({From:Date.parse($scope.calendars.values[0]),To:Date.parse($scope.calendars.values[1])}).then(function (result) {
          $scope.calendars.events = result.concat();
          $scope.events = $scope.calendars.events;
        })
    };

  if ($scope.calendars.events.length == 0)
    {
      Event.getList().then(function (result) {
  //    Event.getList({dateStart:$scope.calendars.values[0],dateEnd:$scope.calendars.values[1]}).then(function (result) {
      $scope.calendars.events = result.concat();
      $scope.calendars.click();
    })
  };

    this.findWord = function(reg){
      console.log('reg= '+reg) ;
        Event.getList({search: reg }).then(function (result) {
        $scope.events = result.concat();
        console.log('num= '+$scope.events.length) ;
      }) ;
    } ;

  $scope.calendars.click();
  }]
});
