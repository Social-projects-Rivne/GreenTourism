angular.module('eventDetail').component('eventDetail', {
  templateUrl: 'components/event/event-detail/event-detail.template.html',
  controller: ['$scope', '$routeParams', '$http', 'eventListService',
    function($scope, $routeParams, $http, eventListService) {
      this.id = $routeParams.eventId;
      if ($routeParams.dataId) this.date = +$routeParams.dataId;
      else this.date = new Date();

      $scope.eventL = eventListService.th;
      $scope.eventL.mainControllerName = 'Event';

      $scope.eventL.date_current = new Date(this.date);

      this.data = $http.get('components/event/event-list/event.data.json').success(function(data) {
        $scope.eventListService = data;
        $scope.eventL.event = data;
        return data;
      }, function(data) {
        console.log('Error : Could not load JSON Event in angular.module - event ');
        return 'error';
      });
    }
  ]
});
