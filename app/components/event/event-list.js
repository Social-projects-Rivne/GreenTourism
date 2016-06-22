angular.module('event', []);

angular.module('event').service('eventList', function ($http){

    if (!this.date_current) new Date();

    this.event = [
        {
            name: 'Toronto, Canada',
            description: 'Fast just got faster with Nexus S.',
            date_start: 1468853756239,
            place: 'Toronto, Canada',
            url_poster: 'event0.jpg',
            tags: ['festival', 'meeting', 'photos', 'others', 'game']
        }
    ];

    this.find_date = function (dateFind, sort) {
        return this.event.filter(function (itEvent) {
            var temp_date = new Date(itEvent.date_start);
            console.log(temp_date.toDateString() + ' == ' + dateFind.toDateString()) ;
            if (sort == 1) return temp_date > dateFind;
            return temp_date.toDateString() == dateFind.toDateString();
        })
    };
    this.ta = 8889 ;

    return{
        th : this
    };
}) ;
