angular.module('events', [])
  .component('events', {
    templateUrl: 'components/event/events/events.template.html',
    controller: function($scope, $http, eventList) {

      $scope.eventL = eventList.th;
      $scope.eventL.mainControllerName = 'Events';
      $scope.eventL.date_current = new Date();

      this.data = $http.get('components/event/events/event.data.json').success(function(data) {
        $scope.eventList = data;
        $scope.eventL.event = data;

        return data;
      }, function(data) {
        console.log('Error : Could not load JSON Event in angular.module - event ');
        return 'error';
      });

      $scope.give_event = eventList.th;
      this.danni = $scope.give_event.event;
    }
  });
