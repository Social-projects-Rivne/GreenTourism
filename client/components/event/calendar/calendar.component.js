angular.module('calendar', []);

angular.module('calendar').component('calendar', {
  templateUrl: 'components/event/calendar/calendar.template.html',
  controller: ["calendarService", "$scope", function(calendarService, $scope) {

    $scope.service = calendarService.th;
    console.log('service.names.length = '+($scope.service.names.length)) ;



    // initialize component value
    if ($scope.service.names.length>1) return; //max calendar on page - 2
    if ($scope.service.names.length==0) {
      this.name = 'From';
      this.calendar_show_date = $scope.service.values[0];
    }
    if ($scope.service.names.length==1) {
      this.name = 'To' ;
      this.calendar_show_date = $scope.service.values[1] ;
    }

      $scope.service.names.push(this.name) ;
    console.log(' this.name= ' + this.name + ' service.names['+($scope.service.names.length-1)+']= ' + $scope.service.names[$scope.service.names.length-1]) ;


    this.calendar_carent_date = this.calendar_show_date;

   /**/
    this.calendar_init = function(some_date) {
      this.calendar_month = [];

      function getFirstWeekDayOfMonth(year, month) {
        var date = new Date(year, month);
        return date.getDay();
      }

      function getLastDateOfMonth(year, month) {
        var date = new Date(year, month + 1, 0);
        return date.getDate();
      }

      var start_mounth = getFirstWeekDayOfMonth(some_date.getFullYear(), (some_date.getMonth()));
      if (start_mounth == 0) start_mounth = 7;
      var end_mounth = getLastDateOfMonth(some_date.getFullYear(), (some_date.getMonth()));

      for (var i = 2 - start_mounth;
        (i < end_mounth + 1 || (i + start_mounth - 2) % 7); i++) {
        var d = new Date(some_date);
        d.setDate(i);

        var push_obj = {};
        push_obj.active = d.getMonth() == some_date.getMonth() ? 1 : 0;
        push_obj.active = d.toDateString() == this.calendar_show_date.toDateString() ? 2 : push_obj.active;
        push_obj.date = d;

        push_obj.events = $scope.service.find_date(push_obj.date);

        this.calendar_month.push(push_obj);
      }
/*      if (($scope.give_event.mainControllerName == 'MapEvent') && ($scope.give_event.CalendarName.length > 1)) {
        $scope.give_event.mainController.temp_click();
      }*/
    };

    this.calendar_init(this.calendar_show_date);

    this.carent_day = function(date) {
      this.calendar_show_date = new Date(date);
      this.calendar_init(this.calendar_show_date);
      if (this.name=='To') $scope.service.values[1] = this.calendar_show_date;
      else $scope.service.values[0] = this.calendar_show_date;
      $scope.service.click() ;
    };

    this.chenge_mounth = function(step) {
      var it = this.calendar_show_date.getMonth();
      this.calendar_show_date.setMonth(it + step);
      this.calendar_init(this.calendar_show_date);
      if (this.name=='To') $scope.service.values[1] = this.calendar_show_date;
      else $scope.service.values[0] = this.calendar_show_date;
      $scope.service.click() ;
    };

/*    if ((this.name == '1') && ($scope.give_event.mainControllerName == 'MapEvent')) {
      $scope.service.mainController.temp_click();
    }*/
  }]
});
