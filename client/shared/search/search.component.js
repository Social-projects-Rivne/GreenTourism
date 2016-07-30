angular.module('greenTourism',['ui.bootstrap'])
  .component('searchPlace', {
    templateUrl: 'shared/search/search.template.html',
    controller: ['Search', '$scope', function SearchCtrl(Search, $scope) {
      var minLength = 3;
      $scope.loading = false;
      var searchBy = 'place';
      $scope.delay = 500;

      $scope.onSelect = function(place){
        $scope.selected = place;
      };
      $scope.places = function(placeName) {
        if (placeName.length < minLength) {
          return [];
        }
        $scope.loading = true;
        return Search.getList({name: [searchname], searchBy: [searchBy]}).then(function(result) {
          $scope.loading = false;
          return result;
        }, function(status){
          $scope.loading = false;
        });
      };
      /*
       this.searchPlace = function(searchname) {
       Search.getList({name: [searchname], searchBy: [searchBy]}).then(function(result) {
       console.log("SEARCH");
       console.log(result);
       });
       }*/
    }]
  });