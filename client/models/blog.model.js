angular.module('blogModel', ['restangular'])
  .factory('Blog', ['Restangular', function Blog(Restangular) {
    var Blog = Restangular.service('blogs');
    return Blog;
  }]);
