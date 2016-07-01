angular.module('eventMapType', ['event'])
    .component('eventMapType', {
        templateUrl: 'components/events-map/events-map-type/event-map-type.template.html',
        controller: function ($scope, $http, $rootScope, eventList) {
            $scope.eventL = eventList.th ;

            this.data = $http.get('components/events/event.data.json').success(function (data) {
                $scope.eventL.event=data;
                $scope.eventList = $scope.eventL.all_type() ;
                console.log(' $scope.eventL.Item_type_menu ' + $scope.eventL.Item_type_menu) ;
                $scope.eventL.Type_menu[$scope.eventL.Type.indexOf($scope.eventL.Item_type_menu)].active = true ;

                return data;
            }, function (data) {
                return 'error' ;
            });

            $scope.eventList = $scope.eventL.all_type() ;

            console.log('$scope.eventList' +  $scope.eventList) ;

            this.changeActive = function (subMenu) {
                $scope.eventL.Type_menu[$scope.eventL.Type.indexOf(subMenu)].active ? $scope.eventL.Type_menu[$scope.eventL.Type.indexOf(subMenu)].active=false : $scope.eventL.Type_menu[$scope.eventL.Type.indexOf(subMenu)].active=true  ;
                $scope.somthing_test = $scope.eventL.find_event($scope.eventL.CalendarName[0].calendar_show_date,$scope.eventL.CalendarName[1].calendar_show_date,$scope.eventL.active_type()) ;

                console.log(' type filter  eventMap ' + $scope.somthing_test ) ;
                console.log(' $scope.eventList.mainController.temp_click() : ') ;
                console.log($scope.eventL.mainController.temp_click) ;
                $scope.eventL.mainController.temp_click() ;
            } ;

            $('.dropdown-menu').on({
                'click': function (e) {
                    e.stopPropagation();
                }
            });
        }
    });