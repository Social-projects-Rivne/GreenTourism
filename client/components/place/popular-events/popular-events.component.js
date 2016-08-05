angular.module('popularEvents', [])
    .component('popularEvents', {
      templateUrl: 'components/place/popular-events/popular-events.template.html',
      controller: ['$scope', 'Event', 'calendarService', 'mapFactory', function popularEventsController($scope, Event, calendarService, mapFactory) {
          $scope.calendars = calendarService;
          $scope.calendars.clear() ;

          $scope.calendars.click = function () {
              $scope.events = $scope.calendars.events.filter(function (event) {
                  return new Date(event.dateStart) >= $scope.calendars.values[0] && new Date(event.dateEnd) <= $scope.calendars.values[1];
              });
          };

          if ($scope.calendars.events.length == 0)
          {
              Event.getList().then(function (result) {
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

        var self = this;
        self.popularEvents = [];
        var userLocation;
        console.log('Modal - medal!') ;

          // Don't hide dropdown if clicked
          angular.element('.dropdownStop').on({
              click: function(e) {
                  e.stopPropagation();
              }
          });

      }]
    });