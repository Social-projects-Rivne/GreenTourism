angular.module('greenTourism')
  .component('searchPlace', {
    templateUrl: 'shared/search/search.template.html',
    controller:['Place', function (Place) {
      /*
       It will be search code here
       Place.getList({name: [input. name]}).then(function (result) {
       console.log("search="+result);
       });*/

    }]
  });