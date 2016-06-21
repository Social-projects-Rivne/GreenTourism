angular.module('events', [])
.component('events', {
    templateUrl: 'components/events/events.template.html',
    controller: function($scope,$http,eventList) {

        //Get event.data
        $scope.eventL = eventList.th ;
        //   console.log(' $routeParams.dataId ' + $routeParams.dataId) ;
        $scope.eventL.date_current =  new Date() ;



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

        $scope.give_event=eventList.th ;
        this.danni = $scope.give_event.event ;

    }

  });
