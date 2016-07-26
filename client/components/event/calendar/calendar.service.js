angular.module('calendar').service('calendarService', [function() {

  // initialize service value
  this.values = [] ;
  this.values[0] = new Date();
  this.values[1] = new Date();
  this.values[1].setDate(this.values[0].getDate() + 60);

  this.names = [];
  this.events = [];

  this.click ; // function for binding calendar whith events in other controller, empty when start

  this.clear = function() {
    this.names = [];

    return;
  };

  this.findDate = function(dateFind, sort) {
    return this.events.filter(function(itEvent) {
      var tempDate= new Date(itEvent.date_start);
      if (sort == 1) return tempDate > dateFind;
      return tempDate.toDateString() == dateFind.toDateString();
    });
  };

  return this ;

}]);
