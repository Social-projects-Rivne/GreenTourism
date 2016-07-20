angular.module('greenTourism')
  .component('searchPlace', {
    templateUrl: 'components/place/search-place.template.html',
    controller:['Place', function (Place) {
      /*
      It will be search code here
      Place.getList({name: [input. name]}).then(function (result) {
      console.log("search="+result);
    });*/

    }]
  });