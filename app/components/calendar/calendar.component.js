angular.module('calendar', []);

angular.module('calendar').component('calendar', {
  templateUrl: 'components/calendar/calendar.template.html',
  controller: function($scope, eventList) {
    $scope.give_event = eventList.th;

    this.calendar_carent_date = new Date();
    this.calendar_show_date = new Date($scope.give_event.date_current);

    this.calendar_init = function(some_date) {
      console.log(' some_date= ' + some_date);
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
    };

    this.calendar_init(this.calendar_show_date);

    this.carent_day = function(date) {
      this.calendar_show_date = new Date(date);
      this.calendar_init(this.calendar_show_date);
      $scope.give_event.date_current = this.calendar_show_date;
    }

    this.chenge_mounth = function(step) {
      var it = this.calendar_show_date.getMonth();
      this.calendar_show_date.setMonth(it + step);
      this.calendar_init(this.calendar_show_date);

      $scope.give_event.date_current = this.calendar_show_date;
    };

  }
});


angular.module('calendar').service('give_event', function($http) {
  this.date_current = new Date();
  this.exampd = 'assa';

  this.event = [{
    name: 'Nexus S',
    description: 'Fast just got faster with Nexus S.',
    date_start: 1468853756239,
    place: 'Toronto, Canada',
    url_poster: 'event0.jpg',
    tags: ['festival', 'meeting', 'photos', 'others', 'game']
  }, {
    name: 'Motorola XOOM™ with Wi-Fi',
    description: 'The Next, Next Generation tablet.',
    date_start: 1474210556239,
    place: 'Paris, France',
    url_poster: 'event1.jpg',
    tags: ['competition', 'game', 'festival', 'others']
  }, {
    name: 'MOTOROLA XOOM™',
    description: 'The First, MOTOROLA tablet.',
    date_start: 1472435556239,
    place: 'Rivne, Ukraine',
    url_poster: 'event2.jpg',
    tags: ['competition', 'game', 'festival', 'others']
  }, {
    name: 'Definition, evolution, and research',
    description: 'Definition, evolution, and research',
    date_start: 1468453756239,
    place: 'Three dog on grog',
    url_poster: 'event3.jpg',
    tags: ['festival', 'competition', 'game', 'meeting', 'photos', 'others']
  }, {
    name: 'Festival Management & Event Tourism',
    description: 'Festival Management & Event Tourism is a referred journal published quarterly, sold by annual subscription only, to meet the needs and interest of event managers, researchers, related businesses, and those concerned with festivals and special events.',
    date_start: 1474010556239,
    place: 'Three dog on grog',
    url_poster: 'event4.jpg',
    tags: ['game', 'photos', 'others']
  }, {
    name: 'Reviews in Analgesia ',
    description: '(formerly Analgesia) is an international journal that publishes in English original reviews by experts on topics related to the basic mechanisms and therapeutics of pain relief. Reviews are invited that focus on pain mechanisms, endogenous mediators of pain, mechanisms of analgesia, and the synthesis, testing, or mechanism of action study of known or experimental analgesic compounds-including nonanalgesic and side effect endpoints and abuse liability. In addition, reviews of clinical studies or practice are invited that help elucidate the mechanism of action of known analgesic drugs, or that report on the use of experimental compounds or combinations. Reviews on new or standard methodological approaches, statistical analyses, and theoretical or mathematical treatments are also invited.',
    date_start: 1472215556239,
    place: 'Three dog on grog',
    url_poster: 'event5.jpg',
    tags: ['competition', 'game', 'photos', 'others']
  }, {
    name: 'Motorola XOOM™ with Wi-Fi',
    description: 'The Next, Next Generation tablet.',
    date_start: 1474210556239,
    place: 'Three dog on grog',
    url_poster: 'event6.jpg',
    tags: ['competition', 'game', 'photos', 'others']
  }, {
    name: 'MOTOROLA XOOM™',
    description: 'The First, MOTOROLA tablet.',
    date_start: 1474215556239,
    place: 'Three dog on grog',
    url_poster: 'event7.jpg',
    tags: ['competition', 'game', 'photos', 'others']
  }, {
    name: 'Definition, evolution, and research',
    description: 'Definition, evolution, and research',
    date_start: 1468423756239,
    place: 'Three dog on grog',
    url_poster: 'event3.jpg',
    tags: ['festival', 'competition', 'game', 'others']
  }, {
    name: 'Festival Management & Event Tourism',
    description: 'Festival Management & Event Tourism is a referred journal published quarterly, sold by annual subscription only, to meet the needs and interest of event managers, researchers, related businesses, and those concerned with festivals and special events.',
    date_start: 1474012556239,
    place: 'Three dog on grog',
    url_poster: 'event0.jpg',
    tags: ['competition', 'photos', 'others']
  }, {
    name: 'The Definition of Event Management',
    description: 'Event management is the process by which an event is planned, prepared, and produced. As with any other form of management, it entails the assessment, definition, acquisition, allocation, direction, control, and analysis of time, finances, people, products, services, and other resources to achieve objectives”. • “An event manager’s job is to oversee and arrange every aspect of an event, including researching, planning, organizing, implementing, controlling, and evaluating an event’s design, activities, and production”.',
    date_start: 1472415556239,
    place: 'Three dog on grog',
    url_poster: 'event2.jpg',
    tags: ['competition', 'game', 'photos', 'others']
  }];

  this.find_date = function(dateFind, sort) {
    return this.event.filter(function(itEvent) {
      var temp_date = new Date(itEvent.date_start);
      if (sort == 1) return temp_date > dateFind;
      return temp_date.toDateString() == dateFind.toDateString();
    })
  };

  return {
    vax: this
  }
});
