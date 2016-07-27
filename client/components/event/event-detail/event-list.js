angular.module('eventDetail', []);

angular.module('eventDetail').service('eventListService', ['$http', function($http) {
  if (!this.date_current) new Date();
  this.CalendarName = [];
  this.CalendarValue = [];
  this.Type = [];
  this.mainController = 'Noname';
  this.mainControllerName = 'Noname';
  this.TypeMenu = [];
  this.itemTypeMenu;

  this.event = [];

  this.findDate = function(dateFind, sort) {
    return this.event.filter(function(itEvent) {
      var tempDate = new Date(itEvent.date_start);
      if (sort == 1) return tempDate > dateFind;
      return tempDate.toDateString() == dateFind.toDateString();
    });
  };

  this.findDistance = function(lat, lng, event) {
    function compareEvent(eventA, eventB) {
      var comperA = +Math.pow(Math.abs(+eventA.eventPoints[0].lat - lat), 2) + Math.pow(Math.abs(+eventA.eventPoints[0].lon - lng), 2);
      var comperB = +Math.pow(Math.abs(+eventB.eventPoints[0].lat - lat), 2) + Math.pow(Math.abs(+eventB.eventPoints[0].lon - lng), 2);
      return comperA - comperB;
    }
    return event.sort(compareEvent);
  };

  this.find_event = function(dateStart, dateEnd, type) {
    return this.event.filter(function(itEvent) {
      var _startDate = new Date(itEvent.date_start);
      var _endDate = new Date(itEvent.date_end);
      var _type = itEvent.type;
      if (_startDate >= dateStart && _endDate <= dateEnd) {
        for (i = 0; i < type.length; i++)
          if (_type == type[i]) return true;
      }
    });
  };

  this.all_type = function() {
    for (j = 0; j < this.event.length; j++) {
      if (this.Type.indexOf(this.event[j].type) == -1) {
        this.Type.push(this.event[j].type);
        var pushObj = {};
        pushObj.active = false;
        pushObj.type = this.event[j].type;
        this.TypeMenu.push(pushObj);
      }
    }
    return this.TypeMenu;
  };

  this.active_type = function() {
    var types = [];
    for (j = 0; j < this.TypeMenu.length; j++) {
      if (this.TypeMenu[j].active) types.push(this.TypeMenu[j].type);
    }
    return types;
  };

  this.clear = function() {
    this.CalendarName = [];
    this.Type = [];
    this.mainController = 'Noname';
    this.mainControllerName = 'Noname';
    this.TypeMenu = [];
    this.itemTypeMenu;
    this.CalendarValue = [];

    return;
  };

  return {
    th: this
  };
}]);
