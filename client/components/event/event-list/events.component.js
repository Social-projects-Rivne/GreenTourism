angular.module('eventList', [])
  .component('eventList', {
    templateUrl: 'components/event/event-list/event-list.template.html',
    controller: ["$scope", "$http", "eventListService", function($scope, $http, eventListService) {
      $scope.eventL = eventListService.th;
      $scope.eventL.mainControllerName = 'Events';
      $scope.eventL.date_current = new Date();

      $scope.sort_by = 'date_start' ;
      $scope.sort = function(sort){
        $scope.sort_by = sort ;
      }

      this.data = $http.get('components/event/event-list/event.data.json').success(function(data) {
        $scope.eventListService = data;
        $scope.eventL.event = data;

        return data;
      }, function(data) {
        console.log('Error : Could not load JSON Event in angular.module - event ');
        return 'error';
      });

      $scope.give_event = eventListService.th;
      this.danni = $scope.give_event.event;
    }]
  });
