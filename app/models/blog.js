angular.module('greenTourism')
  .factory('Blog', ['Restangular', function Blog(Restangular) {
    var Blog = Restangular.service('blogs');

    // Custom methods goes here

    return Blog;
  }]);
