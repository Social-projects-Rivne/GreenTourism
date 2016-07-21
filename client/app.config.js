angular.module('greenTourism')
  .config(['RestangularProvider', function(RestangularProvider) {
    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setRestangularFields({
      id: '_id'
    });
  }]);
