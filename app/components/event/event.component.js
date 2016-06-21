
angular.module('event').component('event', {
    templateUrl: 'components/event/event.template.html',
    controller: ['$scope','$routeParams','$http','eventList',
        function ($scope,$routeParams,$http,eventList) {
            this.id = $routeParams.eventId;
            if ($routeParams.dataId) this.date = + $routeParams.dataId;
            else this.date = new Date() ;


            //alert(this.eventId);
/*        }
        function($scope,$http,eventList) {*/
        //this.id = 900000009 ;

        //Get event.data
       $scope.eventL = eventList.th ;
         //   console.log(' $routeParams.dataId ' + $routeParams.dataId) ;
       $scope.eventL.date_current =  new Date(this.date) ;
            // alert(this.date) ;
            //$scope.eventL.event =  $scope.eventL ;

        this.data = $http.get('components/events/event.data.json').success(function (data) {
            $scope.eventList=data;
            $scope.eventL.event=data;
            //alert(' $scope.eventL.event ' + $scope.eventL.event) ;
            //console.log(' $scope.eventL.event ' + $scope.eventL.event) ;
            //alert($scope.eventL.id) ;
            return data;
        }, function (data) {
            console.log('Error : Could not load JSON Event in angular.module - event ') ;
            return 'error' ;
        });/* */


    }]
  });
