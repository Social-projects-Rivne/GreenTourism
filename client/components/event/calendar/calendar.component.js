angular.module('calendar', []);

angular.module('calendar').component('calendar', {
  templateUrl: 'components/event/calendar/calendar.template.html',
  controller: ["$http", "$scope", "eventListService", function($http, $scope, eventListService) {
    $scope.give_event = eventListService.th;

    this.calendar_carent_date = new Date();

    if ($scope.give_event.date_current) this.calendar_show_date = new Date($scope.give_event.date_current);
    else this.calendar_show_date = new Date();

    this.name = $scope.give_event.CalendarName.length;

    if ($scope.give_event.mainControllerName == 'MapEvent') {
      if ($scope.give_event.CalendarValue[$scope.give_event.CalendarName.length]) this.calendar_show_date = new Date(+$scope.give_event.CalendarValue[$scope.give_event.CalendarName.length]);
    }
    /**/

    $scope.give_event.CalendarName.push(this);

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

        push_obj.events = $scope.give_event.find_date(push_obj.date);

        this.calendar_month.push(push_obj);
      }
      if (($scope.give_event.mainControllerName == 'MapEvent') && ($scope.give_event.CalendarName.length > 1)) {
        $scope.give_event.mainController.temp_click();
      }
    };

    this.calendar_init(this.calendar_show_date);

    this.carent_day = function(date) {
      this.calendar_show_date = new Date(date);
      this.calendar_init(this.calendar_show_date);
      $scope.give_event.date_current = this.calendar_show_date;
    };

    this.chenge_mounth = function(step) {
      var it = this.calendar_show_date.getMonth();
      this.calendar_show_date.setMonth(it + step);
      this.calendar_init(this.calendar_show_date);

      $scope.give_event.date_current = this.calendar_show_date;
    };

    if ((this.name == '1') && ($scope.give_event.mainControllerName == 'MapEvent')) {
      $scope.give_event.mainController.temp_click();
    }
  }]
});
