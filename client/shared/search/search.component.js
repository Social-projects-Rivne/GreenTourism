angular.module('searchPlace', ['ui.bootstrap','ngAnimate'])
  .component('searchPlace', {
    templateUrl: 'shared/search/search.template.html',
    controller: ['Search', '$scope', function SearchCtrl(Search, $scope) {
      var searchBy = 'place';
      $scope.noResults = false;
      $scope.placesearch = '';
      Search.getList({ searchBy: [searchBy]}).then(function(result) {
        $scope.places=result;
        console.log( $scope.places);
      });
    }]
  });