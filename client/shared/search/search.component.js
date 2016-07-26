angular.module('greenTourism')
  .component('searchPlace', {
    templateUrl: 'shared/search/search.template.html',
    controller: ['Search', function SearchCtrl(Search) {

      this.searchPlace = function(searchname) {
        var searchBy = 'place';
        //Place.getList({name: [input. name]}).then(function (result)
        Search.getList({name: [searchname], searchBy: [searchBy]}).then(function(result) {
          console.log("SEARCH");
          console.log(result);
        });
      }
    }]
  });