angular.module('calendar', []);

angular.module('calendar').component('calendar', {
  templateUrl: 'components/event/calendar/calendar.template.html',
  controller: ["calendarService", "$scope", function(calendarService, $scope) {

    $scope.service = calendarService;
    console.log('service.names.length = '+($scope.service.names.length)) ;

    // initialize component value
    if ($scope.service.names.length>1) return; //max calendar on page - 2
    if ($scope.service.names.length==0) {
      this.name = 'From';
      this.calendarShowDate = $scope.service.values[0];
    }
    if ($scope.service.names.length==1) {
      this.name = 'To' ;
      this.calendarShowDate = $scope.service.values[1] ;
    }

      $scope.service.names.push(this.name) ;
    console.log(' this.name= ' + this.name + ' service.names['+($scope.service.names.length-1)+']= ' + $scope.service.names[$scope.service.names.length-1]) ;


    this.calendarCurrentDate = this.calendarShowDate;

   /**/
    this.calendarInit = function(someDate) {
      this.calendarMonth = [];

      function getFirstWeekDayOfMonth(year, month) {
        var date = new Date(year, month);
        return date.getDay();
      }

      function getLastDateOfMonth(year, month) {
        var date = new Date(year, month + 1, 0);
        return date.getDate();
      }

      var startMounth = getFirstWeekDayOfMonth(someDate.getFullYear(), (someDate.getMonth()));
      if (startMounth == 0) startMounth = 7;
      var endMounth = getLastDateOfMonth(someDate.getFullYear(), (someDate.getMonth()));

      for (var i = 2 - startMounth;
        (i < endMounth + 1 || (i + startMounth - 2) % 7); i++) {
        var d = new Date(someDate);
        d.setDate(i);

        var pushObj = {};
        pushObj.active = d.getMonth() == someDate.getMonth() ? 1 : 0;
        pushObj.active = d.toDateString() == this.calendarShowDate.toDateString() ? 2 : pushObj.active;
        pushObj.date = d;

        pushObj.events = $scope.service.findDate(pushObj.date);

        this.calendarMonth.push(pushObj);
      }
    };

    this.calendarInit(this.calendarShowDate);

    this.currentDay = function(date) {
      this.calendarShowDate = new Date(date);
      this.calendarInit(this.calendarShowDate);
      if (this.name=='To') $scope.service.values[1] = this.calendarShowDate;
      else $scope.service.values[0] = this.calendarShowDate;
      $scope.service.click() ;
    };

    this.changeMonth = function(step) {
      var it = this.calendarShowDate.getMonth();
      this.calendarShowDate.setMonth(it + step);
      this.calendarInit(this.calendarShowDate);
      if (this.name=='To') $scope.service.values[1] = this.calendarShowDate;
      else $scope.service.values[0] = this.calendarShowDate;
      $scope.service.click() ;
    };

  }]
});
