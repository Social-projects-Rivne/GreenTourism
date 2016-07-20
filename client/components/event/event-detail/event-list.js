angular.module('eventDetail', []);

angular.module('eventDetail').service('eventListService', ['$http', function($http) {
  if (!this.date_current) new Date();
  this.CalendarName = [];
  this.CalendarValue = [];
  this.Type = [];
  this.mainController = 'Noname';
  this.mainControllerName = 'Noname';
  this.Type_menu = [];
  this.Item_type_menu;

  this.event = [];

  this.find_date = function(dateFind, sort) {
    return this.event.filter(function(itEvent) {
      var temp_date = new Date(itEvent.date_start);
      if (sort == 1) return temp_date > dateFind;
      return temp_date.toDateString() == dateFind.toDateString();
    });
  };

  this.find_distanse = function(lat, lng, event) {
    function compareEvent(eventA, eventB) {
      var comperA = +Math.pow(Math.abs(+eventA.event_points[0].lat - lat), 2) + Math.pow(Math.abs(+eventA.event_points[0].lon - lng), 2);
      var comperB = +Math.pow(Math.abs(+eventB.event_points[0].lat - lat), 2) + Math.pow(Math.abs(+eventB.event_points[0].lon - lng), 2);
      return comperA - comperB;
    }
    return event.sort(compareEvent);
  };

  this.find_event = function(dateStart, dateEnd, type) {
    return this.event.filter(function(itEvent) {
      var _start_date = new Date(itEvent.date_start);
      var _end_date = new Date(itEvent.date_end);
      var _type = itEvent.type;
      if (_start_date >= dateStart && _end_date <= dateEnd) {
        for (i = 0; i < type.length; i++)
          if (_type == type[i]) return true;
      }
    });
  };

  this.all_type = function() {
    for (j = 0; j < this.event.length; j++) {
      if (this.Type.indexOf(this.event[j].type) == -1) {
        this.Type.push(this.event[j].type);
        var push_obj = {};
        push_obj.active = false;
        push_obj.type = this.event[j].type;
        this.Type_menu.push(push_obj);
      }
    }
    return this.Type_menu;
  };

  this.active_type = function() {
    var types = [];
    for (j = 0; j < this.Type_menu.length; j++) {
      if (this.Type_menu[j].active) types.push(this.Type_menu[j].type);
    }
    return types;
  };

  this.clear = function() {
    this.CalendarName = [];
    this.Type = [];
    this.mainController = 'Noname';
    this.mainControllerName = 'Noname';
    this.Type_menu = [];
    this.Item_type_menu;
    this.CalendarValue = [];

    return;
  };

  return {
    th: this
  };
}]);
