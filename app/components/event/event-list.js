angular.module('event', []);

angular.module('event').service('eventList', function($http) {

  if (!this.date_current) new Date();

  this.event = [];

  this.find_date = function(dateFind, sort) {
    return this.event.filter(function(itEvent) {
      var temp_date = new Date(itEvent.date_start);
      if (sort == 1) return temp_date > dateFind;
      return temp_date.toDateString() == dateFind.toDateString();
    })
  };

  return {
    th: this
  };
});
