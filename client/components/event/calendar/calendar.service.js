angular.module('calendar').service('calendarService', [function() {

  // initialize service value
  this.values = [] ;
  this.values[0] = new Date();
  this.values[1] = new Date();
  this.values[1].setDate(this.values[0].getDate() + 60);

  this.names = [];
  this.events = [];

  this.click ;

  this.test = function() {
    alert('test') ;
  };

  this.clear = function() {
    this.names = [];

    return;
  };

  this.find_date = function(dateFind, sort) {
    return this.events.filter(function(itEvent) {
      var temp_date = new Date(itEvent.date_start);
      if (sort == 1) return temp_date > dateFind;
      return temp_date.toDateString() == dateFind.toDateString();
    });
  };

  return {
    th: this
  };
}]);
