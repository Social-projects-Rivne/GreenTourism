angular.module('greenTourism').config(function($resourceProvider) {
  $resourceProvider.defaults.actions.update = {
    method: 'PUT'
  };
});
