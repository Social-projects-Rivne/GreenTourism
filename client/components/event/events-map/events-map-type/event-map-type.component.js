angular.module('eventMapType', ['event'])
  .component('eventMapType', {
    templateUrl: 'components/event/events-map/events-map-type/event-map-type.template.html',
    controller: ['$scope', '$http', '$rootScope', 'eventListService', function($scope, $http, $rootScope, eventListService) {
      $scope.eventL = eventListService.th;

      this.data = $http.get('components/event/event-list/event.data.json').success(function(data) {
        $scope.eventL.event = data;
        $scope.eventListService = $scope.eventL.all_type();
        $scope.eventL.TypeMenu[$scope.eventL.Type.indexOf($scope.eventL.itemTypeMenu)].active = true;

        return data;
      }, function(data) {
        return 'error';
      });

      $scope.eventListService = $scope.eventL.all_type();

      this.changeActive = function(subMenu) {
        $scope.eventL.TypeMenu[$scope.eventL.Type.indexOf(subMenu)].active ? $scope.eventL.TypeMenu[$scope.eventL.Type.indexOf(subMenu)].active = false : $scope.eventL.TypeMenu[$scope.eventL.Type.indexOf(subMenu)].active = true;
        $scope.somthing_test = $scope.eventL.find_event($scope.eventL.CalendarName[0].calendarShowDate, $scope.eventL.CalendarName[1].calendarShowDate, $scope.eventL.active_type());

        $scope.eventL.mainController.temp_click();
      };

      $('.dropdown-menu').on({
        'click': function(e) {
          e.stopPropagation();
        }
      });
    }]
  });
