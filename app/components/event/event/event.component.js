angular.module('event').component('event', {
  templateUrl: 'components/event/event/event.template.html',
  controller: ['$scope', '$routeParams', '$http', 'eventList',
    function($scope, $routeParams, $http, eventList) {
      this.id = $routeParams.eventId;
      if ($routeParams.dataId) this.date = +$routeParams.dataId;
      else this.date = new Date();

      $scope.eventL = eventList.th;
      $scope.eventL.mainControllerName = 'Event';

      $scope.eventL.date_current = new Date(this.date);

      this.data = $http.get('components/event/events/event.data.json').success(function(data) {
        $scope.eventList = data;
        $scope.eventL.event = data;
        return data;
      }, function(data) {
        console.log('Error : Could not load JSON Event in angular.module - event ');
        return 'error';
      });
    }
  ]
});
